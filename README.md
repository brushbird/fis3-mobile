## 基于fis3的移动端项目示例配置及使用


## 移动端主要实现功能
* 1. 自动编译scss/sass/less等css预处理文件
* 2. 自动将css中的px单位属性转换为rem单位，实现移动端自适应
* 3. 自动为css3属性添加各移动端兼容前缀（autoprefixer）
* 4. 自动压缩png图片，压缩合并js、css
* 5. 支持js文件和css文件指纹功能，解决服务器强缓存问题
* 6. 支持多个页面各自进行打包合并
* 7. ajax模拟数据支持

---------------------------------------

## 完整配置及使用方法：

### 1. 安装新版本的node.js环境


### 2. 由于npm网速不理想， 可以安装cnpm替之

详细方法：https://npm.taobao.org/

* a.打开命令行（开始菜单搜索cmd）, 输入：

```cmd
  npm install -g cnpm --registry=https://registry.npm.taobao.org
```

* b.安装完成后以后npm的指令可以用cnpm代替执行

### 3. 安装fis3，安装方法：

> a. 安装fis3环境， 命令行执行：  ```cmd
    npm install -g fis3
  ```
  ```
* b. 在项目根目录下执行下面的命令，安装`package.json`对应的npm依赖：

  ```cmd
    npm i
  ```

  亦可全局安装，方便以后使用。


### 3. fis-conf.js配置

若有特殊项目则可以自行修改配置文件fis-conf.js。


### 4.开始使用

* a.将该模板项目`clone`到本地。
* b. 执行以下命令，然后浏览器会默认自动打开127.0.0.1:8080，若没有则要自行打开。

  ```cmd
    npm run start
  ```

* c. 命令行执行开启自动同步刷新功能

  ```cmd
    npm run dev
  ```

* d. 选择一个`js组合`进行开发

目前项目可使用JQuery组合或原生组合，为了优化加载速度，如若不涉及jQuery插件，推荐使用原生组合
原生组合请在`index.html`中引入`axios.min.js`，以方便在原生环境下进行ajax接口请求（axios使用方法参考`app.js`）。
喜欢使用es6进行开发的同学请参考使用`app.js`
使用模板前请将`index.html`及`index.js`或`app.js`文件中的示例代码手动清除


### 6. 编译测试包，当完成项目编码后，可以打测试包，放到线上测试环境中测试，测试包不会压缩代码、合并文件，以方便调试。

* a. 在命令行中进入到项目目录下。

* b. 命令行执行：
  ```cmd
    npm run test
  ```


### 7. 编译正式包，当测试通过后，可以打正式包，此时就会压缩代码、合并文件。

* a. 在命令行中进入到项目目录下。

* b. 命令行执行：
  ```cmd
    npm run dist
  ```


### 8.如果在线上遇到强缓存的情况，可以将配置文件中TEST_USE_HASH或FORMAL_USE_HASH置为true，开启文件指纹功能。



### 9.使用rem自适应布局方案时，需要注意下面几点：
* 1. 在HTML的`<head>`中添加适配信息`<meta>`和和适配JS`<script>`后开启REM适配方案

```HTML
  <meta name="fitsetting" content="width=750,height=1206,mode=1">
  <script src="j/lib/screen-adaptor.js"></script>
```

其中，`meta`的配置属性如下：

> `width`: 项目的设计稿宽度 default：750

> `height`: 项目的设计稿高度 default：1206

> `mode`: 适配模式（0: 只根据宽度进行缩放,1：当屏幕比例小于设计比例时根据高度进行缩放，以保证所有内容在单屏内） default：0

> `scale`: 自定义缩放比，当`scale` > 0时，强制将缩放比设为改值，适用于某些小游戏项目 default：0

* 2. 字体大小样式，建议添加`/*px*/`注释标识，fis3会自动将其转成适配3种DPR的样式

```css
  .intro {
    font-size: 24px; /*px*/
  }
```

* 3. 1px边框，建议添加`/*no*/`注释标识，fis3会将不会将其转成rem单位

```css
  .intro {
    border: 1px solid #fff; /*no*/
  }
```

### 10.获取图片资源列表

在需要使用文件资源列表时，如需要预加载项目所需的图片时，我们就可以在js文件中使用：

```javascript
  var aRes =  __resload('i'); // 以数组形式返回i文件夹下所有的图片文件路径
```

### 11.ajax数据模拟

由于活动型项目的接口一般都较少且简单，在后端完成正式接口前，可以使用mock静态数据即可满足需求。

a. 静态模拟数据
在`/mock`目录下创建一个返回数据的json文件(如下文的`userInfo.json`)，在`server.conf`文件下配置路由规则：

```config
  rewrite ^\/api\/user$ /mock/userInfo.json
```

当我们启动fis3服务器并`fis3 release -wL`后，即可访问`/api/user`接口地址获取数据。
一般我们把接口地址统一写在`index.html`下的`oPageConfig.oUrl`中，方便上线替换正式地址。

```javascript
    window.oPageConfig = {
      oUrl: {
        'getUserInfo': '/api/user',
      }
    }
```

That's it, try one try and have fun.


### 12.真机调试

`j/lib`下默认带了`vconsole.js`库，可便于在移动设备上查看`console`内容
