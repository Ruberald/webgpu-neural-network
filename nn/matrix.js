// #pragma once
// #include "shape.h"
// #include <memory>
// #include <vector>

// class Matrix {
//     public:
//         Matrix(Shape shape);
//         Matrix(size_t rows, size_t cols);
//         Matrix(const Matrix& other);
//         Matrix& operator=(const Matrix& other);
//         ~Matrix();

//         Shape shape() const;

//         std::shared_ptr<float> cpu_data_ptr;
//         std::shared_ptr<float> gpu_data_ptr;
//         void allocate_memory();

//         int total_size() const;
//         float& operator()(size_t row, size_t col);
//         const float& operator()(size_t row, size_t col) const;

//         float& operator[](size_t index);
//         const float& operator[](size_t index) const;

//         void set_row(size_t row, const std::vector<float>& values);
//         void set_col(size_t col, const std::vector<float>& values);

//         void copy_to_gpu() const;
//         void copy_to_cpu() const;
//         void set_data_in_gpu_as_valid();
//         bool gpu_data_is_valid() const;
//         uint32_t rows() const { return shape_.x; }
//         uint32_t cols() const { return shape_.y; }

//         Matrix T() const;
//         Matrix operator*(const Matrix& other) const;
//         Matrix operator*(float scalar) const;
//         Matrix operator+(const Matrix& other) const;
//         Matrix operator-(const Matrix& other) const;

//         Matrix sum_rows() const;
//         Matrix sum_cols() const;

//         void setIdentity();

//         Matrix clip(float min_val, float max_val) const;

//     private:
//         Shape shape_;
//         float* data_;

//         void allocate_cpu_memory();
//         void allocate_gpu_memory();

//         friend std::ostream& operator<<(std::ostream& os, const Matrix& matrix);
//         mutable bool has_propagated_updates_to_gpu = false;
// };

class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Float32Array(rows * cols);
    this.gpuData = null; // Placeholder for GPU data buffer
    this.hasPropagatedUpdatesToGPU = false;

    this.shaderModules = {
      multiply: null, // Will be set later when we load the shader code
      transpose: null, // Will be set later when we load the shader code
    };
  }

  size() {
    return this.rows * this.cols;
  }

  shape() {
    return [this.rows, this.cols];
  }

  load_shader_modules(device) {
    // Load shader modules for matrix multiplication and transpose
    this.shaderModules.multiply = device.createShaderModule({
      code: await fetch('./shaders/multiply.wgsl').then(response => response.text())
    });

    this.shaderModules.transpose = device.createShaderModule({
      code: await fetch('./shaders/transpose.wgsl').then(response => response.text())
    });
  }

  allocate_gpu_memory(device) {
    const gpuMatrixBuffer = device.createBuffer({
      mappedAtCreation: true,
      size: this.data.byteLength,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
    });

    this.gpuData = gpuMatrixBuffer;
  }

  copy_to_gpu() {
    const arrayBuffer = this.gpuData.getMappedRange();
    new Float32Array(arrayBuffer).set(this.data);
    this.gpuData.unmap();
    this.hasPropagatedUpdatesToGPU = true;
  }

  copy_to_cpu() {
    // Will implement later lmao
  }

  set_identity() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i * this.cols + j] = i === j ? 1 : 0;
      }
    }
    this.hasPropagatedUpdatesToGPU = false;
  }

  set_row(row, values) {
    for (let col = 0; col < this.cols; col++) {
      this.data[row * this.cols + col] = values[col];
    }
    this.hasPropagatedUpdatesToGPU = false;
  }

  set_col(col, values) {
    for (let row = 0; row < this.rows; row++) {
      this.data[row * this.cols + col] = values[row];
    }
    this.hasPropagatedUpdatesToGPU = false;
  }

  transpose() {
    
}
