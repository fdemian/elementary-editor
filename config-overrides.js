const { override, useBabelRc, fixBabelImports } = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const imports = [
  {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  },
  {
    libraryName: 'ant-design-pro',
    libraryDirectory: 'lib',
    style: 'css',
    camel2DashComponentName: false,
  },
  new AntdDayjsWebpackPlugin()
];

module.exports = override(
   fixBabelImports('antd', imports),
);
