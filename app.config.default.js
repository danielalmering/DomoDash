//////////////////////
// Config
//////////////////////

var CONFIG_HOSTNAME                   = 'http://191.168.1.0:8084';
var CONFIG_HOSTLOGIN                  = ''; // encode username password to base64
var CONFIG_REFRESH                    = '5000';
var CONFIG_BGIMAGES                   = '3';
var CONFIG_WEATHER_WUNDERGROUND_API   = '';
var CONFIG_WEATHER_COUNTRY            = 'NL';
var CONFIG_WEATHER_LOCATION           = 'Almere-Haven';
var CONFIG_WEATHER_REFRESH            = '300000';
var CONFIG_NEWS_RSS_URLS              = ['https://crossorigin.me/http://www.nu.nl/rss/algemeen', 'https://crossorigin.me/http://feeds.feedburner.com/tweakers/nieuws'];
var CONFIG_NEWS_RSS_MAXITEMS          = '1';

var CONFIG_COLUMS                     = [
    {colum: '1', class: 'col-xs-12 col-sm-4'},
    {colum: '2', class: 'col-xs-12 col-sm-4'},
    {colum: '3', class: 'col-xs-12 col-sm-4'}
];

var CONFIG_BLOCKS                     = [
    {type: 'Tabs', class: 'col-xs-12 col-sm-12', colum: 'colum1'},
    {type: 'Heading', class: 'col-xs-12 col-sm-12', colum: 'colum2', title: 'Nieuws'},
    {type: 'News', class: 'col-xs-12 col-sm-12', colum: 'colum2'},
    {type: 'Weather', class: 'col-xs-12 col-sm-12', colum: 'colum3'}
];

var CONFIG_TABS                       = [
    {tab: '1', type: 'Switches', class: 'col-xs-12 col-sm-6', title: 'Schakelaars'},
    {tab: '2', type: 'Switches', class: 'col-xs-12 col-sm-6', title: 'Scenes'}
]; // Max 2 tabs!!
