// only on chrome canary and edge rn
function check_webgpu_support() {
    if (!navigator.gpu) {
        alert("WebGPU is not supported in this browser.");
        throw new Error("WebGPU not supported");
    }
}

async function get_webgpu_device() {
    // for llm training, we want high performance
    const options = { powerPreference: "high-performance" };

    const adapter = await navigator.gpu.requestAdapter(options);
    if (!adapter) {
        throw new Error("Failed to get GPU adapter");
    }
    // sometimes it falls back to a software adapter because js is dumb and loves failing silently
    if (adapter.isFallbackAdapter) {
        throw new Error("Fallback GPU adapter is not suitable for high-performance tasks");
    }

    const device = await adapter.requestDevice();
    if (!device) {
        throw new Error("Failed to get GPU device");
    }
    return device;
}

export { check_webgpu_support, get_webgpu_device };
