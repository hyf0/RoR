const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

if (!isProd && !isDev) {
  throw new Error(`Unknown env ${process.env.NODE_ENV}`)
}

/**
 * @type {import('@rspack/cli').Configuration}
 */
export default {
  mode: isProd ? 'production' : 'none',
  output: {
    filename: '[name]-[hash:8][ext]',
  },
  entry: './src/main',
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
  builtins: {
    html: [
      {
        template: './index.html',
      },
    ],
  },
}
