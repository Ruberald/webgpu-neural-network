import { check_webgpu_support, get_webgpu_device } from "./webgpu/utils.js";

let device;

try {
    check_webgpu_support();
    device = await get_webgpu_device();
    console.log("WebGPU device acquired:", device);
} catch (error) {
    console.error("Error acquiring WebGPU device:", error);
}

// Store device details
const name = device.adapterInfo.description || "Unknown GPU Device";
const limits = device.limits;

console.log("Device Name:", name);
console.log("Device Limits:", limits);


// First Matrix

const firstMatrix = new Float32Array([
  256 /* rows */, 4 /* columns */,
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
    17, 18, 19, 20,
    21, 22, 23, 24,
    25, 26, 27, 28,
    29, 30, 31, 32,
    33, 34, 35, 36,
    37, 38, 39, 40,
    41, 42, 43, 44,
    45, 46, 47, 48,
    49, 50, 51, 52,
    53, 54, 55, 56,
    57, 58, 59, 60,
    61, 62, 63, 64,
    65, 66, 67, 68,
    69, 70, 71, 72,
    73, 74, 75, 76,
    77, 78, 79, 80,
    81, 82, 83, 84,
    85, 86, 87, 88,
    89, 90, 91, 92,
    93, 94, 95, 96,
    97, 98, 99, 100,
    101, 102, 103, 104,
    105, 106, 107, 108,
    109, 110, 111, 112,
    113, 114, 115, 116,
    117, 118, 119, 120,
    121, 122, 123, 124,
    125, 126, 127, 128,
    129, 130, 131, 132,
    133, 134, 135, 136,
    137, 138, 139, 140,
    141, 142, 143, 144,
    145, 146, 147, 148,
    149, 150, 151, 152,
    153, 154, 155, 156,
    157, 158, 159, 160,
    161, 162, 163, 164,
    165, 166, 167, 168,
    169, 170, 171, 172,
    173, 174, 175, 176,
    177, 178, 179, 180,
    181, 182, 183, 184,
    185, 186, 187, 188,
    189, 190, 191, 192,
    193, 194, 195, 196,
    197, 198, 199, 200,
    201, 202, 203, 204,
    205, 206, 207, 208,
    209, 210, 211, 212,
    213, 214, 215, 216,
    217, 218, 219, 220,
    221, 222, 223, 224,
    225, 226, 227, 228,
    229, 230, 231, 232,
    233, 234, 235, 236,
    237, 238, 239, 240,
    241, 242, 243, 244,
    245, 246, 247, 248,
    249, 250, 251, 252,
    253, 254, 255, 256
]);

const gpuBufferFirstMatrix = device.createBuffer({
  mappedAtCreation: true,
  size: firstMatrix.byteLength,
  usage: GPUBufferUsage.STORAGE,
});
const arrayBufferFirstMatrix = gpuBufferFirstMatrix.getMappedRange();
new Float32Array(arrayBufferFirstMatrix).set(firstMatrix);
gpuBufferFirstMatrix.unmap();


// Second Matrix

const secondMatrix = new Float32Array([
  4 /* rows */, 256 /* columns */,
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
    17, 18, 19, 20,
    21, 22, 23, 24,
    25, 26, 27, 28,
    29, 30, 31, 32,
    33, 34, 35, 36,
    37, 38, 39, 40,
    41, 42, 43, 44,
    45, 46, 47, 48,
    49, 50, 51, 52,
    53, 54, 55, 56,
    57, 58, 59, 60,
    61, 62, 63, 64,
    65, 66, 67, 68,
    69, 70, 71, 72,
    73, 74, 75, 76,
    77, 78, 79, 80,
    81, 82, 83, 84,
    85, 86, 87, 88,
    89, 90, 91, 92,
    93, 94, 95, 96,
    97, 98, 99, 100,
    101, 102, 103, 104,
    105, 106, 107, 108,
    109, 110, 111, 112,
    113, 114, 115, 116,
    117, 118, 119, 120,
    121, 122, 123, 124,
    125, 126, 127, 128,
    129, 130, 131, 132,
    133, 134, 135, 136,
    137, 138, 139, 140,
    141, 142, 143, 144,
    145, 146, 147, 148,
    149, 150, 151, 152,
    153, 154, 155, 156,
    157, 158, 159, 160,
    161, 162, 163, 164,
    165, 166, 167, 168,
    169, 170, 171, 172,
    173, 174, 175, 176,
    177, 178, 179, 180,
    181, 182, 183, 184,
    185, 186, 187, 188,
    189, 190, 191, 192,
    193, 194, 195, 196,
    197, 198, 199, 200,
    201, 202, 203, 204,
    205, 206, 207, 208,
    209, 210, 211, 212,
    213, 214, 215, 216,
    217, 218, 219, 220,
    221, 222, 223, 224,
    225, 226, 227, 228,
    229, 230, 231, 232,
    233, 234, 235, 236,
    237, 238, 239, 240,
    241, 242, 243, 244,
    245, 246, 247, 248,
    249, 250, 251, 252,
    253, 254, 255, 256
]);

const gpuBufferSecondMatrix = device.createBuffer({
  mappedAtCreation: true,
  size: secondMatrix.byteLength,
  usage: GPUBufferUsage.STORAGE,
});
const arrayBufferSecondMatrix = gpuBufferSecondMatrix.getMappedRange();
new Float32Array(arrayBufferSecondMatrix).set(secondMatrix);
gpuBufferSecondMatrix.unmap();


// Result Matrix

const resultMatrixBufferSize = Float32Array.BYTES_PER_ELEMENT * (2 + firstMatrix[0] * secondMatrix[1]);
const resultMatrixBuffer = device.createBuffer({
  size: resultMatrixBufferSize,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
});

const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "read-only-storage"
      }
    },
    {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "read-only-storage"
      }
    },
    {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: "storage"
      }
    }
  ]
});

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: gpuBufferFirstMatrix
    },
    {
      binding: 1,
      resource: gpuBufferSecondMatrix
    },
    {
      binding: 2,
      resource: resultMatrixBuffer
    }
  ]
});

// Compute Shader Code
const shaderModule = device.createShaderModule({
    code: await fetch('./webgpu/matMul.wgsl').then(response => response.text())
});

const computePipeline = device.createComputePipeline({
  layout: device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout]
  }),
  compute: {
    module: shaderModule
  }
});

const commandEncoder = device.createCommandEncoder();

const passEncoder = commandEncoder.beginComputePass();
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
const workgroupCountX = Math.ceil(firstMatrix[0] / 8);
const workgroupCountY = Math.ceil(secondMatrix[1] / 8);
passEncoder.dispatchWorkgroups(workgroupCountX, workgroupCountY);
passEncoder.end();

// Get a GPU buffer for reading in an unmapped state.
const gpuReadBuffer = device.createBuffer({
  size: resultMatrixBufferSize,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
});

// Encode commands for copying buffer to buffer.
commandEncoder.copyBufferToBuffer(resultMatrixBuffer, gpuReadBuffer);

// Submit GPU commands.
const gpuCommands = commandEncoder.finish();
device.queue.submit([gpuCommands]);

// Read buffer.
await gpuReadBuffer.mapAsync(GPUMapMode.READ);
const arrayBuffer = gpuReadBuffer.getMappedRange();
console.log(new Float32Array(arrayBuffer));

