graph LR
CheckpointLoaderSimple --> KSampler
EmptyLatentImage --> KSampler
CheckpointLoaderSimple --> CLIPTextEncode
CLIPTextEncode --> KSampler
CheckpointLoaderSimple --> CLIPTextEncode
CLIPTextEncode --> KSampler
KSampler --> VAEDecode
CheckpointLoaderSimple --> VAEDecode
VAEDecode --> SaveImage