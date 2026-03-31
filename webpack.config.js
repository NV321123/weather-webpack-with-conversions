const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const sharp = require('sharp');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.tsx',
    
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
      publicPath: ''
    },
    
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 500,
      ignored: /node_modules/
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@models': path.resolve(__dirname, 'src/models')
      }
    },
    
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { browsers: ['> 0.25%', 'not dead', 'IE 11'] }, useBuiltIns: 'usage', corejs: 3 }],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript'
              ],
              plugins: [!isProduction && require.resolve('react-refresh/babel')].filter(Boolean)
            }
          }
        },
        
        {
          test: /\.module\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { modules: { localIdentName: '[name]__[local]--[hash:base64:5]' }, sourceMap: true } },
            'postcss-loader',
            { loader: 'sass-loader', options: { api: 'modern' } }
          ],
        },
        
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { modules: false, sourceMap: true } },
            'postcss-loader',
            { loader: 'sass-loader', options: { api: 'modern' } }
          ],
        },
        
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
          generator: { filename: 'images/[name][ext]' }
        },
        
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: { filename: 'fonts/[name][ext]' }
        }
      ]
    },
    
    plugins: [
      new HtmlWebpackPlugin({ template: './src/index.html', minify: isProduction }),
      new MiniCssExtractPlugin({ filename: isProduction ? '[name].[contenthash].css' : '[name].css' }),
      new Dotenv({ systemvars: true, safe: true }),
      
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src/assets/favicon.svg'), to: 'favicon.svg' },
          
          {
            from: path.resolve(__dirname, 'src/assets/fonts/*.ttf'),
            to: path.resolve(__dirname, 'dist/fonts/[name].woff2'),
            transform(content) {
              return require('ttf2woff2')(content);
            },
            noErrorOnMissing: true
          },

          {
            from: path.resolve(__dirname, 'src/assets/images/*.jpg'),
            to: path.resolve(__dirname, 'dist/images/[name].webp'),
            transform(content) {
              return sharp(content)
                .webp({ quality: 75 })
                .toBuffer();
            },
            noErrorOnMissing: true
          },

          {
            from: path.resolve(__dirname, 'src/assets/images/*.jpg'),
            to: path.resolve(__dirname, 'dist/images/[name].avif'),
            transform(content) {
              return sharp(content)
                .avif({ quality: 65 })
                .toBuffer();
            },
            noErrorOnMissing: true
          }
        ],
      }),

      !isProduction && new ReactRefreshPlugin()
    ].filter(Boolean),
    
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({ parallel: true, terserOptions: { ecma: 5, compress: { drop_console: isProduction } } }),
        new CssMinimizerPlugin(),
        
        new ImageMinimizerPlugin({
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
              encodeOptions: {
                jpeg: { quality: 80, progressive: true },
                png: { compressionLevel: 6 },
              },
            },
          },
        }),
      ],
      splitChunks: { chunks: 'all', cacheGroups: { vendor: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' } } }
    },
    
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    
    devServer: {
      static: { directory: path.join(__dirname, 'dist') },
      historyApiFallback: true,
      port: 3000,
      hot: true,
      host: '0.0.0.0',
      allowedHosts: 'all',
      open: true,
      client: { overlay: { errors: true, warnings: false }, progress: true },
    }
  };
};