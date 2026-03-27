struct Matrix {
  size : vec2f,
  numbers: array<f32>,
}

@group(0) @binding(0) var<storage, read> inputMatrix : Matrix;
@group(0) @binding(1) var<storage, read_write> outputMatrix : Matrix;

@compute @workgroup_size(8, 8)
    fn main(@builtin(global_invocation_id) global_id : vec3u) {
        // Guard against out-of-bounds work group sizes
        if (global_id.x >= u32(inputMatrix.size.x) || global_id.y >= u32(inputMatrix.size.y)) {
            return;
        }

        outputMatrix.size = inputMatrix.size;

        let cell = vec2(global_id.x, global_id.y);
        let index = cell.y + cell.x * u32(inputMatrix.size.y);

        outputMatrix.numbers[index] = inputMatrix.numbers[index] * 2.0; // Example scalar multiplication by 2
    }