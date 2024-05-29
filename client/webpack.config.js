const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html', // Output HTML file name
        chunks: ['main'], // Inject only 'main' bundle
      }),
      // new HtmlWebpackPlugin({
      //   template: './src/install.html',
      //   filename: 'install.html', // Output HTML file name
      //   chunks: ['install'], // Inject only 'install' bundle
      // }),
      new WebpackPwaManifest({
        name: 'PWA Text Editor',
        short_name: 'TextEditor',
        description: 'A Progressive Web Application text editor.',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker source file
        swDest: 'service-worker.js', // Output service worker file name
        exclude: [/\.map$/, /manifest\.json$/, /install\.html$/], // Exclude certain files from caching
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
