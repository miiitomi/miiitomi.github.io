module.exports = {
    mode: 'development',
    entry: {
        matching: './src/matching',
    },
    output: {
      path: __dirname + '/static/js',
      filename: '[name].js'
    },
    module: {
        rules: [
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
