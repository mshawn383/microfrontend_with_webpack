const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin=require('webpack/lib/container/ModuleFederationPlugin')
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'/dist'),
        filename:'main.js',
    },
    devServer:{
        port:3010,
     
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
     
                }
            },{
                test:/\.(css|scss)$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html")
    })
,
new ModuleFederationPlugin({
    name:"container",
    remotes:{
        products:'product@http://localhost:3011/remoteEntry.js',
        // subTwo:"sub-container-2@http://localhost:3012/remoteEntry.js"
    },
    shared:packageJson.dependencies
})
],
}