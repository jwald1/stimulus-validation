import buble from "rollup-plugin-buble"
import filesize from "rollup-plugin-filesize"
import resolve from "rollup-plugin-node-resolve"
import babel from "rollup-plugin-babel"
import commonjs from "rollup-plugin-commonjs"

export default {
  input: "src/validation_controller.js",
  external: ["stimulus", "validate.js"],
  output: [
    {
      file: "dist/validation-controller.js",
      format: "cjs",
      name: "StimulusValidation",
      sourcemap: true
    },
    {
      file: "dist/validation-controller.m.js",
      format: "es",
      name: "StimulusValidation",
      sourcemap: true
    },
    {
      file: "dist/validation-controller.umd.js",
      format: "umd",
      name: "StimulusValidation",
      sourcemap: true,
      globals: {
        stimulus: "Stimulus",
        Validate: "validate.js"
      }
    }
  ],
  plugins: [
    resolve(),
    commonjs({
      include: "node_modules/**"
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    buble({
      transforms: {
        classes: true
      },
      objectAssign: "Object.assign"
    }),
    filesize()
  ]
}
