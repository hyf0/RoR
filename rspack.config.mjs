/**
 * @type {import('@rspack/cli').Configuration}
 */
export default {
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
