// 移动端项目 通用配置

// 测试包配置 执行 fis3 release test
var TEST_OUTPUT_PATH = './test'; // 测试包路径 （仅执行编译，不压缩）
var TEST_USE_HASH = false; // 是否使用文件指纹 （随机改变文件名避免浏览器缓存）

// 正式包配置 执行 fis3 release dist
var FORMAL_OUTPUT_PATH = './dist'; // 正式打包路径（包含编译、压缩代码 、图片压缩、csssprite）
var FORMAL_USE_HASH = false; // 是否使用文件指纹 （随机改变文件名避免浏览器缓存）

// 移动端自适应配置
var REM_UNIT = 100; // rem的基础单位
var BASE_DPR = 2; // 通用设备时一般为1

// 常规设置 基本不用动
fis.set('project.files', ['src/**']);
fis.set('project.ignore', ['node_modules/**', 'dist/**', 'README.md', 'test/**', '.git/**', 'fis-conf.js']);
fis.set('charset', 'utf-8');
fis.set('project.charset', 'utf-8');


// 资源加载
fis.match('**.js', {
    preprocessor: fis.plugin('resload'),
});

// 编译es2015
fis.match('j/*.js', {
    parser: fis.plugin('babel-6.x', {
        // presets: [
        // 注意一旦这里在这里添加了 presets 配置，则会覆盖默认加载的 preset-2015 等插件，因此需要自行添加所有需要使用的 presets
        // ]
    }),
    rExt: 'js'
});


// less 编译插件 fis-parser-less
fis.match('**.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});
fis.match(/^\/src\/c\/_.*\.(css|less)/i, {
    release: false
});

// sass 编译插件 fis-parser-node-sass
fis.match('c/*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass')
});

fis.match(/^\/src\/(.*)$/i, {
    release: "$1",
    useCache: false
});

fis.match('c/*.{css,scss}', {
    postprocessor: [
        fis.plugin('px2rem', {
            baseDpr: BASE_DPR, // 基础dpr (default: 2)
            remVersion: true, //是否生成rem版本 (default: true)
            remUnit: REM_UNIT, // rem 单元值 (default: 75)
            remPrecision: 6 // rem 精密度 (default: 6)
        }),
        fis.plugin("autoprefixer", {
            // https://github.com/ai/browserslist#queries
            "browsers": ['ios >= 6', 'Safari >= 6', 'Explorer >= 9', 'Chrome >= 12', "ChromeAndroid >= 4.0"],
            "flexboxfixer": true,
            "gradientfixer": true
        })
    ]
});

// 使用相对路径
fis.hook('relative');

// 配置测试打包 不压缩代码 不合图不压缩
fis.media('test')
    .match('**', {
        relative: true
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant'
        })
    })
    .match('reset.css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('screen-adaptor.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.{js,css,scss,png,jpg,jpeg,gif,mp3,mp4,flv,swf,svg,eot,ttf,woff}', {
        useHash: TEST_USE_HASH
    })
    .match('reset.css', {
        useHash: false
    })
    .match('lib/**.js', { // 库文件不加hash
        useHash: false
    })
    .match('**', {
        deploy: fis.plugin('local-deliver', {
            to: TEST_OUTPUT_PATH
        })
    })



// 配置正式打包 包含压缩代码 合图图压缩
fis.media('dist')
    .match('**', {
        relative: true
    })
    .match('*.{js,css,scss,png,jpg,jpeg,gif,mp3,mp4,flv,swf,svg,eot,ttf,woff}', {
        useHash: FORMAL_USE_HASH
    })
    .match('lib/**.js', { // 库文件不加hash
        useHash: false
    })
    .match('**.js', {
        optimizer: fis.plugin('uglify-js', {
            output: {
                ascii_only: true
            }
        })
    })
    .match('**.html:js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant'
        })
    })
    .match('*.{css,scss}', {
        optimizer: fis.plugin('clean-css')
    })
    .match('**html:css', {
        optimizer: fis.plugin('clean-css')
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                js: function(file) {
                    return "j/" + file.filename + "_aio.js";
                },
                css: function(file) {
                    return "c/" + file.filename + "_aio.css";
                }
            }
        })
    })
    .match('**', {
        deploy: [
            fis.plugin('skip-packed', {
                // 配置项 过滤掉已被打包的文件
            }), fis.plugin('local-deliver', {
                to: FORMAL_OUTPUT_PATH
            })
        ]
    })