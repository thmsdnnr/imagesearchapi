# imagesearchapi

uses Bing API V5 image search API
usage: https://imgsea.herokuapp.com/api/imagesearch/?q=QUERY&o=OFFSET
Offset can be used to paginate through results. Each result set returns 10 items, and offset = 1, for instance, returns items 11-20.
results look like: {"image_url":url,"thumb_url":url,"alt_text":text,"page_url":url} usage: https://imgsea.herokuapp.com/api/latest
Gives latest searches.
results look like: {"term":search term,"when":UTC timestamp of search event}
