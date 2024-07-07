import type { Meta, StoryObj } from '@storybook/svelte';
import Post from '$lib/components/Feed/Post/Post.svelte';
import type { Entry } from '$lib/api';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Feed/Post',
    component: Post
} satisfies Meta<Post>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TextPost: Story = {
    args: {
        entry: {
            "id": 5029,
            "user_id": 1,
            "feed_id": 37,
            "status": "unread",
            "hash": "223379c55e5302e4dbbe071764e01257ac65847e8240912ab4688d0cf04e7512",
            "title": "Making your investigation count at election time. What we’ve learned",
            "url": "https://www.lighthousereports.com/making-your-investigation-count-at-election-time-what-weve-learned/",
            "comments_url": "",
            "published_at": "2024-06-05T07:52:07+02:00",
            "created_at": "2024-06-05T09:12:15.881613+02:00",
            "changed_at": "2024-07-05T20:40:50.303048+02:00",
            "content": "<p>In the context of the looming European Parliament elections, we talk to Director Klaas van Dijken and Food Systems lead reporter Thin Lei Win about their most recent investigations into 2 big issues on the EU election agenda – EU border policy and the farmers protests.</p>\n<p>We dig into the findings of each investigation and the strategic thinking that goes into making them resonate with voters. It’s a relevant listen to any journalists hoping to engage the public around election time.</p>\n<p></p><p><em>You can also listen to the episode on <a href=\"https://open.spotify.com/episode/6JnLRkQhwCViIBhCQt0lhh?si=d12b8aa527054600\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Spotify</a>, <a href=\"https://podcasts.apple.com/us/podcast/making-your-investigation-count-at-election-time-what/id1676255017?i=1000657839444\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Apple Podcasts</a> and <a href=\"https://www.youtube.com/watch?v=lRH-owa_fsM&amp;list=PLpg0Oej_g7oEKUw0S0fW8sy9FxP74fYPD\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">YoutTube</a>.</em></p>\n\n<p><em>Hosts: Beatriz Ramalho da Silva, Tessa Pang</em><br/>\n<em>Sound Design: <a href=\"https://spoovio.com/?utm_source=pod_channel&amp;utm_medium=backlight&amp;utm_campaign=bls02ep06\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Spoovio – Audiovisual Productions</a></em></p>\n<p>The post <a href=\"https://www.lighthousereports.com/making-your-investigation-count-at-election-time-what-weve-learned/\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Making your investigation count at election time. What we’ve learned</a> appeared first on <a href=\"https://www.lighthousereports.com\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Lighthouse Reports</a>.</p>\n",
            "author": "Fanis Kollias",
            "share_code": "",
            "starred": false,
            "reading_time": 0,
            "enclosures": [],
            "feed": {
                "id": 37,
                "user_id": 1,
                "feed_url": "https://www.lighthousereports.com/feed/",
                "site_url": "https://www.lighthousereports.com/",
                "title": "Lighthouse Reports",
                "checked_at": "2024-07-06T11:12:16.469646+02:00",
                "next_check_at": "0001-01-01T00:00:00Z",
                "etag_header": "",
                "last_modified_header": "",
                "parsing_error_message": "",
                "parsing_error_count": 0,
                "scraper_rules": "",
                "rewrite_rules": "",
                "crawler": false,
                "blocklist_rules": "",
                "keeplist_rules": "",
                "urlrewrite_rules": "",
                "user_agent": "",
                "cookie": "",
                "username": "",
                "password": "",
                "disabled": false,
                "no_media_player": false,
                "ignore_http_cache": false,
                "allow_self_signed_certificates": false,
                "fetch_via_proxy": false,
                "hide_globally": false,
                "apprise_service_urls": "",
                "disable_http2": false,
                "category": {
                    "id": 1,
                    "title": "All",
                    "user_id": 1,
                    "hide_globally": false
                },
                "icon": {
                    "feed_id": 37,
                    "icon_id": 20
                }
            },
            "tags": [
                "Backlight"
            ]
        },
        entryIndex: 0,
        feedId: '0'
    },
};

export const LinkPost: Story = {
    args: {
        entry: {
            "id": 8545,
            "user_id": 1,
            "feed_id": 13,
            "status": "unread",
            "hash": "0cac9f30d23447ebca79588c96c64116d9eeae49f631a5c0ab1764b4be7f1041",
            "title": "Top GitHub repositories which everyone should look",
            "url": "https://github.com/sachin-source/top-github-repositories-which-everyone-should-look",
            "comments_url": "https://news.ycombinator.com/item?id=40893074",
            "published_at": "2024-07-06T22:40:03+02:00",
            "created_at": "2024-07-06T23:12:18.064973+02:00",
            "changed_at": "2024-07-06T23:12:18.064973+02:00",
            "content": "<a href=\"https://news.ycombinator.com/item?id=40893074\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Comments</a>",
            "author": "",
            "share_code": "",
            "starred": false,
            "reading_time": 0,
            "enclosures": [],
            "feed": {
                "id": 13,
                "user_id": 1,
                "feed_url": "https://news.ycombinator.com/rss",
                "site_url": "https://news.ycombinator.com/",
                "title": "Hacker News",
                "checked_at": "2024-07-07T07:12:15.972256+02:00",
                "next_check_at": "0001-01-01T00:00:00Z",
                "etag_header": "",
                "last_modified_header": "",
                "parsing_error_message": "",
                "parsing_error_count": 0,
                "scraper_rules": "",
                "rewrite_rules": "",
                "crawler": false,
                "blocklist_rules": "",
                "keeplist_rules": "",
                "urlrewrite_rules": "",
                "user_agent": "",
                "cookie": "",
                "username": "",
                "password": "",
                "disabled": false,
                "no_media_player": false,
                "ignore_http_cache": false,
                "allow_self_signed_certificates": false,
                "fetch_via_proxy": false,
                "hide_globally": true,
                "apprise_service_urls": "",
                "disable_http2": false,
                "category": {
                    "id": 6,
                    "title": "Nerdery",
                    "user_id": 1,
                    "hide_globally": false
                },
                "icon": {
                    "feed_id": 13,
                    "icon_id": 9
                }
            },
            "tags": null
        },
        entryIndex: 0,
        feedId: '0'
    }
}

export const AudioPost: Story = {
    args: {
        entry: {
            "id": 8489,
            "user_id": 1,
            "feed_id": 10,
            "status": "unread",
            "hash": "577e16722d87764455670b3f9f0235eeaef45ae30c0999ad1794095e46bddf93",
            "title": "Glamorösa alpackor och turistgnäll från Grekland",
            "url": "https://sverigesradio.se/avsnitt/2435070",
            "comments_url": "",
            "published_at": "2024-07-06T07:00:00+02:00",
            "created_at": "2024-07-06T09:12:24.67259+02:00",
            "changed_at": "2024-07-06T09:12:24.67259+02:00",
            "content": "<p>Bilder på rökmoln som stiger över grekiska byar och horder av människor som evakueras till fotbollsplaner har präglat högsommarveckorna de senaste åren - och nu är det dags igen.</p><p> <a href=\"https://sverigesradio.se/play/program/2795?utm_source=thirdparty&amp;utm_medium=rss&amp;utm_campaign=episode_medierna\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">Lyssna på alla avsnitt i Sveriges Radio Play.</a></p> <p>Vems röst är egentligen viktigast för svenska medier när bränderna tar semesterparadis som Zakynthos och Kos, och vem är det mest synd om? </p><p>Medierna har i veckan kikat på rapporteringen om bränderna och noterat att det finns åtminstone två olika svar på den frågan.</p><p>Reporter: Fanny Hedenmo </p><h2><strong>Så blev eurodiscodängan en extremhögerhit</strong></h2><p>Gigi D’agostinos megahit L’amour toujours från 2001 har under sommarens inledande veckor gått från att vara en maxad eurodancelåt till att förkläs i en ny text med grovt rasistisk innebörd och få en helt annan laddning än dansgolvspepp. </p><p>Videos och inspelningar sprids när folk skrålar de rasistiska raderna och medier rapporterar flitigt. Vilken hänsyn tar medier till de spridningseffekter som deras rapportering får? För.. var går egentligen gränsen mellan när medier publicerar information och ren inspiration? </p><p>Reporter: Manuel Rauch</p><h2><strong>Glammiga alpackor i en av världens mest nischade medier </strong></h2><p>Hör första delen av vår sommarserie om världens mest nischade medier. Vår reporter Robin Jonsson har porträtterat medierna som ägnar sig åt dom minsta tänkbara frågorna på de mest speciella platserna. Och han börjar i den brittiska staden Telford, där de bästa av de bästa har samlats för årets mest prestigefyllda tävling.</p><p>Reporter: Robin Jonsson </p>",
            "author": "Sveriges Radio",
            "share_code": "",
            "starred": false,
            "reading_time": 29,
            "enclosures": [
                {
                    "id": 645483,
                    "user_id": 1,
                    "entry_id": 8489,
                    "url": "https://sverigesradio.se/topsy/ljudfil/itunes/9392832.mp3",
                    "mime_type": "audio/mpeg",
                    "size": 28694382,
                    "media_progression": 0
                }
            ],
            "feed": {
                "id": 10,
                "user_id": 1,
                "feed_url": "https://api.sr.se/api/rss/pod/itunes/3951",
                "site_url": "https://sverigesradio.se/medierna",
                "title": "Medierna",
                "checked_at": "2024-07-07T07:12:16.169011+02:00",
                "next_check_at": "0001-01-01T00:00:00Z",
                "etag_header": "",
                "last_modified_header": "",
                "parsing_error_message": "",
                "parsing_error_count": 0,
                "scraper_rules": "",
                "rewrite_rules": "",
                "crawler": false,
                "blocklist_rules": "",
                "keeplist_rules": "",
                "urlrewrite_rules": "",
                "user_agent": "",
                "cookie": "",
                "username": "",
                "password": "",
                "disabled": false,
                "no_media_player": false,
                "ignore_http_cache": false,
                "allow_self_signed_certificates": false,
                "fetch_via_proxy": false,
                "hide_globally": false,
                "apprise_service_urls": "",
                "disable_http2": false,
                "category": {
                    "id": 3,
                    "title": "Podcasts",
                    "user_id": 1,
                    "hide_globally": true
                },
                "icon": {
                    "feed_id": 10,
                    "icon_id": 7
                }
            },
            "tags": [
                "News"
            ]
        },
        entryIndex: 0,
        feedId: '0'
    }
}

export const YouTubePost: Story = {
    args: {
        entry: {
            "id": 8464,
            "user_id": 1,
            "feed_id": 28,
            "status": "unread",
            "hash": "0de1194126fbd1bb488468f990d83f4153a43f78bd14429d509f9c21893cdf0f",
            "title": "Elon Musk Admitted I Was Right - WAN Show July 5, 2024",
            "url": "https://www.youtube.com/watch?v=WgwQDQD6dII",
            "comments_url": "",
            "published_at": "2024-07-06T00:35:18+02:00",
            "created_at": "2024-07-06T03:12:16.971291+02:00",
            "changed_at": "2024-07-06T03:12:16.971291+02:00",
            "content": "<iframe width=\"650\" height=\"350\" frameborder=\"0\" src=\"https://www.youtube-nocookie.com/embed/WgwQDQD6dII\" allowfullscreen=\"\" sandbox=\"allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox\" loading=\"lazy\"></iframe><br/>Check out the Delta Pro 3 at: <a href=\"https://bit.ly/3VWbqb6\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">https://bit.ly/3VWbqb6</a><br/>See how the Delta Pro 3 powers Smash Champs at: <a href=\"https://youtu.be/wTuOasmssE0\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">https://youtu.be/wTuOasmssE0</a><br/><br/>Visit <a href=\"https://www.squarespace.com/WAN\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">https://www.squarespace.com/WAN</a> and use offer code WAN for 10% off<br/><br/>Check out the K65 Plus Wireless Mechanical Keyboard at: <a href=\"https://lmg.gg/corsairk65plus\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">https://lmg.gg/corsairk65plus</a><br/><br/>Check out the Secretlab Titan Evo Ergonomic Gaming chair and more at <a href=\"https://lmg.gg/secretlabwan\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">https://lmg.gg/secretlabwan</a><br/><br/>Get a special deal on Private Internet Access VPN today at <a href=\"https://www.piavpn.com/LinusWan\" rel=\"noopener noreferrer\" target=\"_blank\" referrerpolicy=\"no-referrer\">https://www.piavpn.com/LinusWan</a><br/><br/>Podcast Download: TBD<br/>Timestamps (courtesy of NoKi1119): TBD",
            "author": "Linus Tech Tips",
            "share_code": "",
            "starred": false,
            "reading_time": 0,
            "enclosures": [
                {
                    "id": 641569,
                    "user_id": 1,
                    "entry_id": 8464,
                    "url": "https://i4.ytimg.com/vi/WgwQDQD6dII/hqdefault.jpg",
                    "mime_type": "image/*",
                    "size": 0,
                    "media_progression": 0
                },
                {
                    "id": 641572,
                    "user_id": 1,
                    "entry_id": 8464,
                    "url": "https://www.youtube.com/v/WgwQDQD6dII?version=3",
                    "mime_type": "application/x-shockwave-flash",
                    "size": 0,
                    "media_progression": 0
                }
            ],
            "feed": {
                "id": 28,
                "user_id": 1,
                "feed_url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCXuqSBlHAE6Xw-yeJA0Tunw",
                "site_url": "https://www.youtube.com/channel/UCXuqSBlHAE6Xw-yeJA0Tunw",
                "title": "Linus Tech Tips",
                "checked_at": "2024-07-07T07:12:13.877861+02:00",
                "next_check_at": "0001-01-01T00:00:00Z",
                "etag_header": "",
                "last_modified_header": "",
                "parsing_error_message": "",
                "parsing_error_count": 0,
                "scraper_rules": "",
                "rewrite_rules": "",
                "crawler": false,
                "blocklist_rules": "",
                "keeplist_rules": "",
                "urlrewrite_rules": "",
                "user_agent": "",
                "cookie": "",
                "username": "",
                "password": "",
                "disabled": false,
                "no_media_player": false,
                "ignore_http_cache": false,
                "allow_self_signed_certificates": false,
                "fetch_via_proxy": false,
                "hide_globally": false,
                "apprise_service_urls": "",
                "disable_http2": false,
                "category": {
                    "id": 4,
                    "title": "YouTube",
                    "user_id": 1,
                    "hide_globally": true
                },
                "icon": {
                    "feed_id": 28,
                    "icon_id": 4
                }
            },
            "tags": null
        },
        entryIndex: 0,
        feedId: '0'
    }
}