// __global__ void transpose_kernel(float* M, float* out, uint32_t input_rows, uint32_t input_cols){
//     int row = blockIdx.x * blockDim.x + threadIdx.x;
//     int col = blockIdx.y*blockDim.y + threadIdx.y;

//     if (row >= input_rows || col >= input_cols){
//         return;
//     }
//     out[col*input_rows + row] = M[row*input_cols + col];
// }

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

        outputMatrix.size = vec2(inputMatrix.size.y, inputMatrix.size.x);

        let inputCell = vec2(global_id.x, global_id.y);
        let outputCell = vec2(global_id.y, global_id.x);

        let inputIndex = inputCell.y + inputCell.x * u32(inputMatrix.size.y);
        let outputIndex = outputCell.y + outputCell.x * u32(outputMatrix.size.y);

        outputMatrix.numbers[outputIndex] = inputMatrix.numbers[inputIndex];
    }