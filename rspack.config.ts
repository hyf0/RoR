import type { Configuration } from '@rspack/cli'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

if (!isProd && !isDev) {
  throw new Error(`Unknown env ${process.env.NODE_ENV}`)
}

const config: Configuration = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main',
  output: {
    clean: true,
    filename: '[name]-[hash:8][ext]',
    // Rspack has the same HMR issue as https://github.com/webpack-contrib/mini-css-extract-plugin/issues/444
    cssChunkFilename: isDev ? '[name][ext]' : undefined,
  },
  builtins: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    html: [
      {
        template: './index.html',
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                  autoprefixer: {},
                },
              },
            },
          },
        ],
        type: 'css',
      },
    ],
  },
}

export default config
