"""Notify IndexNow after GitHub Pages has published the canonical sitemap URLs."""

import argparse
from pathlib import Path
import json
import os
import time
import urllib.error
import urllib.request
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
HOST = 'alpen-malergeschaeft.ch'
BASE = f'https://{HOST}/'
KEY = '71a0b0b8402c04e016d9396fbe2b8fd5'
ENDPOINT = 'https://api.indexnow.org/indexnow'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}


def sitemap_urls(xml):
    tree = ET.fromstring(xml)
    if tree.tag != '{' + NS['s'] + '}urlset':
        raise ValueError('Expected a sitemap urlset')
    urls = list(dict.fromkeys(node.text.strip() for node in tree.findall('s:url/s:loc', NS) if node.text))
    if not 0 < len(urls) <= 10000:
        raise ValueError('Sitemap must contain 1 to 10000 URLs')
    for url in urls:
        parts = urlsplit(url)
        if parts.scheme != 'https' or parts.netloc != HOST or parts.fragment or parts.query:
            raise ValueError(f'Unexpected sitemap URL: {url}')
    return urls


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': 'Alpen-IndexNow/1.0'})
    with urllib.request.urlopen(request, timeout=30) as response:
        if response.status != 200 or response.geturl() != url:
            raise ValueError(f'Expected a direct HTTP 200: {url}')
        if 'noindex' in response.headers.get('X-Robots-Tag', '').lower():
            raise ValueError(f'URL is marked noindex: {url}')
        return response.read()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--dry-run', action='store_true', help='Validate local sitemap without sending a notification')
    parser.add_argument('--wait-for-deploy', metavar='SHA', help='Wait for the GitHub Pages deployment of this revision')
    args = parser.parse_args()
    urls = sitemap_urls((ROOT / 'sitemap.xml').read_bytes())
    if (ROOT / f'{KEY}.txt').read_text().strip() != KEY:
        raise ValueError('Local ownership key is invalid')
    payload = {'host': HOST, 'key': KEY, 'keyLocation': f'{BASE}{KEY}.txt', 'urlList': urls}
    if args.dry_run:
        print(json.dumps({'dry_run': True, 'urls': urls}))
        return

    if args.wait_for_deploy:
        api = f'https://api.github.com/repos/MergimKosumi/alpen-malergeschaeft/actions/runs?head_sha={args.wait_for_deploy}&per_page=100'
        for attempt in range(30):
            headers = {'Accept': 'application/vnd.github+json', 'User-Agent': 'Alpen-IndexNow/1.0'}
            if os.environ.get('GH_TOKEN'):
                headers['Authorization'] = 'Bearer ' + os.environ['GH_TOKEN']
            with urllib.request.urlopen(urllib.request.Request(api, headers=headers), timeout=30) as response:
                runs = json.load(response)['workflow_runs']
            pages = [r for r in runs if r['name'] == 'pages build and deployment' and r['head_sha'] == args.wait_for_deploy]
            if pages:
                latest = max(pages, key=lambda r: r['id'])
                if latest['status'] == 'completed':
                    if latest['conclusion'] != 'success':
                        raise RuntimeError('Pages deployment failed; no IndexNow notification sent')
                    print('GitHub Pages deployment succeeded', flush=True)
                    break
            if attempt == 29:
                raise RuntimeError('Timed out waiting for GitHub Pages deployment')
            time.sleep(10)

    # Pages/CDN propagation may lag behind a successful deployment event.
    for attempt in range(12):
        try:
            if fetch(payload['keyLocation']).decode('utf-8').strip() != KEY:
                raise ValueError('Live ownership key does not match')
            if sitemap_urls(fetch(BASE + 'sitemap.xml')) != urls:
                raise ValueError('Live sitemap does not match the deployed version')
            for url in urls:
                fetch(url)
            break
        except (urllib.error.URLError, ValueError) as error:
            if attempt == 11:
                raise
            print(f'Waiting for Pages propagation: {error}', flush=True)
            time.sleep(20)

    request = urllib.request.Request(ENDPOINT, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json; charset=utf-8', 'User-Agent': 'Alpen-IndexNow/1.0'}, method='POST')
    with urllib.request.urlopen(request, timeout=45) as response:
        if response.status not in (200, 202):
            raise RuntimeError(f'IndexNow returned HTTP {response.status}')
        print(f'IndexNow HTTP {response.status}: {len(urls)} URL(s) received. Indexing is not guaranteed.')


if __name__ == '__main__':
    main()
