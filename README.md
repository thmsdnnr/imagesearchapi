# imagesearchapi

uses Bing API V5 image search API
usage: https://imgsea.herokuapp.com/api/imagesearch/?q=QUERY&o=OFFSET
Offset can be used to paginate through results. Each result set returns 10 items, and offset = 1, for instance, returns items 11-20.
results look like: {"image_url":url,"thumb_url":url,"alt_text":text,"page_url":url} usage: https://imgsea.herokuapp.com/api/latest
Gives latest searches.
results look like: {"term":search term,"when":UTC timestamp of search event}

enhancements:
* clean up code and improve reusability with some better functions for displaying returned object
* cache search results in mongodb collection to reduce API calls for searches that have already been performed
* front-end client
* use search pivot to display other searches
* tiled thumbnails from front-end client w/color scheme and elaborate display stuff (tho much beyond scope of "challenge")
