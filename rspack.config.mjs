import path from 'node:path'
import url from 'node:url'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

if (!isProd && !isDev) {
  throw new Error(`Unknown env ${process.env.NODE_ENV}`)
}

const root = path.dirname(path.resolve(url.fileURLToPath(import.meta.url)))

const paths = {
  root,
  output: path.join(root, './dist'),
}

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main',
  output: {
    clean: true,
    path: paths.output,
    filename: './assets/[name]-[hash:8][ext]',
    // Rspack has the same HMR issue as https://github.com/webpack-contrib/mini-css-extract-plugin/issues/444
    cssFilename: `./styles/[name]${isProd ? '-[hash:8]' : ''}[ext]`,
  },
  experiments: {
    newSplitChunks: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        reacts: {
          test: /[\\/](react|react-dom)[\\/]/,
          priority: 0,
        },
      },
    },
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
