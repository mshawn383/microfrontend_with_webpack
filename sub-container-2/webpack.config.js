const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin=require("webpack/lib/container/ModuleFederationPlugin")
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'/dist'),
        filename:'main.js',
    },
    devServer:{
        port:3012,
     
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
    }),
new ModuleFederationPlugin({
    
        name:'sub_container_2',
        filename:"remoteEntry.js",
        exposes:{
            './sub_container_2':'./src/index'
        }
    
})
],
}