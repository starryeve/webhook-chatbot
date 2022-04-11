import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.cjs.js',
      format: 'cjs',
      entryFileNames: '[name].cjs.js'
    },
    plugins: [
      del({
        targets: ['lib/**/*']
      }),
      nodeResolve(), // 查找和打包node_modules中的第三方模块
      commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
      typescript({
        tsconfig: './tsconfig.json'
      }) // 解析TypeScript
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.esm.js',
      format: 'esm',
      entryFileNames: '[name].esm.js'
    },
    plugins: [
      nodeResolve(), // 查找和打包node_modules中的第三方模块
      commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
      typescript({
        tsconfig: './tsconfig.json'
      }) // 解析TypeScript
    ]
  }
]
