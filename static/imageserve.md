##项目简介
###功能
图片基础展示管理

* 图片存储（图片使用md5校验，相同内容的多个图片实际只会存储一份）
* 图片上传/删除
* 新建文件夹/删除文件夹
* tree api提供获取ztree树形结构

Policy图片处理

* thumbnail policy实现图片的自定义放缩(列表图片自动生成使用缩略图)
* watermark policy实现图片的自动加水印
* policy组合的添加、删除、修改
* html2image实现 基于html生成渲染图

###实现

* 界面基于bootstrap - aceadmin 以及AngularJS MVC框架
* 服务端使用NodeJS处理请求
* 数据库使用MongoDB存储数据表以及图片二进制信息
* 图片处理生成等基于ImageMagick以及PhantomJS

##API接口说明



###/image/...  GET 获取图片或者文件夹内容
url格式：

		/image + path
可选参数：
		
        policy: 提供需要适配的policy的name
        如果提供此参数，则会自动生成适用于该policy的图片并返回。

示例1：

		/image/folder1/folder2/abc.jpg 
        可以获取到根目录/folder1/folder2文件夹下的abc.jpg图片的内容。可直接在< img >标签中使用。 
        
        错误情况会直接走进ajaxError分支，并且返回错误字符串。

示例2：
		
        /image/folder1  
        可以获取到根目录下folder1文件夹中所有项目的列表。
        
        [
        {"_id":"54212b7060a2966205eee44c","url":"/folder1/2323","type":"folder","image":0,"policy":null},
        {"_id":"54222cee3773aa181ee6d3e1","url":"/folder1/产品详情","type":"folder","image":0,"policy":null},
        {"_id":"54225eea94b122d01fbda840","url":"/folder1/宝贝图片","type":"folder","image":0,"policy":null},
        {"_id":"5420e1ec534133bc630dc4d2","url":"/folder1/羊毛衫","type":"folder","image":0,"policy":null}
        ]
        
        错误情况会直接走进ajaxError分支，并且返回错误字符串。
        
### /imagelist/...   GET 获取图片列表
url格式： 

		/imagelist + path
示例：

		/imagelist/folder1  
        可以获取到folder1目录以及子目录下的全部image列表。
        
        [
        {"_id":"54377f67f41d0344141a4fbf","url":"/folder1/update.jpg","type":"image/jpeg","image":"ce152c3e05a1ae867174235ea53b9203","policy":null},
        {"_id":"54377f95f41d0344141a4fc6","url":"/folder1/name1/folder2/photo5 (1).png","type":"image/png","image":"9fb4792fca933c6b09103df20e6d4670","policy":null},
        {"_id":"54377f7bf41d0344141a4fc2","url":"/folder1/name1/201101251544425200.png","type":"image/png","image":"fe11eb600825dea10b1839ecfb55d258","policy":null},
        {"_id":"54377f7bf41d0344141a4fc3","url":"/folder1/name1/abc.jpg","type":"image/jpeg","image":"83a4df0c410c5f8fb45cd7e9a46a7c10","policy":null}
        ]
        
        
        
		错误情况会直接走进ajaxError分支，并且返回错误字符串。

### /folderlist/...  GET 获取文件夹列表
url格式：

		/folderlist + path
示例：

		/folderlist/folder1  
        可以获取到folder1目录以及子目录下的全部文件夹列表。带上id和pid等信息方便生成树状结构。
        
       [
       {"id":"/folder1","pid":"/","name":"folder1","content":{"_id":"5437811ef41d0344141a4fc7","url":"/folder1","type":"folder","image":0,"policy":null}},
       {"id":"/folder1/folder2","pid":"/folder1","name":"folder2","content":{"_id":"54378124f41d0344141a4fc8","url":"/folder1/folder2","type":"folder","image":0,"policy":null}},
       {"id":"/folder1/folder2/folder3","pid":"/folder1/folder2","name":"folder3","content":{"_id":"5437812bf41d0344141a4fc9","url":"/folder1/folder2/folder3","type":"folder","image":0,"policy":null}},
       {"id":"/folder1/abc","pid":"/folder1","name":"abc","content":{"_id":"5437812ff41d0344141a4fca","url":"/folder1/abc","type":"folder","image":0,"policy":null}}
       ]
        
        错误情况会直接走进ajaxError分支，并且返回错误字符串。

### /api/add/folder  POST  新建文件夹
需要参数：

        parenturl：字符串 代表需要新建文件夹的父目录  如 /folder1
        url：字符串 代表新建文件夹的名字  如 folder2
正常态返回值：
		
        ajaxSuccess返回被添加的文件夹
        {"_id":"542a416fa8dc3ca01b26f820","url":"/folder1/folder2","type":"folder","image":0,"policy":null}
异常态返回值：

		ajaxError返回具体错误字符串。包括数据库错误、提供参数错误、没有找到父目录等多种情况会返回错误。
### /api/add/image   POST  上传图片
需要参数：

		parenturl：字符串 代表需要上传图片的父目录  如 /folder1
        file对象：包含文件流，文件名，mimetype，encoding等。
        
正常态返回值：

		ajaxSuccess返回被添加的对象
        {"url":"/folder1/123.jpg","type":"image/jpeg","image":"74d9594bbaca0513de51eec9d3f052a1","policy":null,"_id":"542a475d6f5b629804626d38"}
        
异常态返回值：

		ajaxError返回具体错误字符串。包括数据库错误、提供参数错误、没有找到父目录等多种那个情况下会返回错误。
### /api/remove/image   DELETE  删除图片
需要参数：

		url：字符串 代表被删除文件的绝对路径  如 /folder1/123.jpg
        
正常态返回值：

		ajaxSuccess返回被删除的对象
        {"url":"/folder1/123.jpg","type":"image/jpeg","image":"74d9594bbaca0513de51eec9d3f052a1","policy":null,"_id":"542a475d6f5b629804626d38"}
        
异常态返回值：

		ajaxError返回具体错误字符串。包括数据库错误、提供参数错误、没有找到父目录等多种情况会返回错误。
### /api/remove/folder  DELETE   删除文件夹以及文件夹下所有图片
需要参数：

		url：字符串 代表被删除文件夹的绝对路径  如 /folder1
        
正常态返回值：

		ajaxSuccess返回被删除的对象
        {"_id":"542a46bc09ccc5c81019ba44","url":"/folder1","type":"folder","image":0,"policy":null}
        
异常态返回值：

		ajaxError返回具体错误字符串。包括数据库错误、提供参数错误、没有找到父目录等多种情况会返回错误。
### /api/update/folder  PUT 文件夹重命名
需要参数：

		url：字符串 代表需要被重命名文件夹的绝对路径  如 /folder1
        newname：字符串 代表文件夹的新名  如folder2
        
正常态返回值：

		ajaxSuccess返回重命名后的对象
        {"_id":"542a46bc09ccc5c81019ba44","url":"/folder2","type":"folder","image":0,"policy":null}
        
异常态返回值：

		ajaxError返回具体错误字符串。包括数据库错误、提供参数错误、没有找到父目录等多种情况会返回错误。


        
### /api/add/policy  POST 添加policy策略
需要参数示例

		‘name’ : 'policy1'
        'content':[{type:"resize",width:400,height:300,direction:left},
        {type:"thumbnail",size:200},
        {type:"watermark",str:"xxxxxxxxx",x:0,y:0,width:400,height:300}]
        
解释：
	
    	name代表policy的名字。policy添加完毕后，图片可以用此名字指定使用此policy进行处理。
        content代表policy的处理项目。是一个数组，包含多个处理项。
        其中每一个项目都包含type代表处理类型，以及需要的其他参数。
        处理时，会按照数组中处理项的顺序，依次处理。每一项的输出作为下一项的输入。
        
目前可添加的policy处理项目：

		缩略图处理：type需要指定为 thumbnail
        需要提供参数 size，单位为像素，缩略图图片处理时，会使用此size对图片做等比例缩放处理。所以图片不会产生变形。如果提供size超过当前图片的大小，则返回当前图片。
        示例：{type:"thumbnail",size:150}
        
返回内容
		
        增加的policy信息
        

### /api/remove/policy  DELETE 删除policy策略
需要参数示例

		‘name’ : 'policy1'
        
返回内容
		
        被删除的policy信息
        
### /api/policy/...  GET 获取policy策略
url格式示例

		/api/policy/policy1
        policy1代表policy的name，必须是已经添加到数据库中的policy才能正确返回。
        
返回内容
		
        policy信息
        
        
### /api/update/policy  PUT 修改policy策略
需要参数示例

		‘name’ : 'policy1'
        'content':[{type:"resize",width:400,height:300,direction:left},
        {type:"thumbnail",width:200,height:100},
        {type:"watermark",str:"xxxxxxxxx",x:0,y:0,width:400,height:300}]
        
返回内容
		
        修改后的policy信息
        
        