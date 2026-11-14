美术说球和平面的软阴影糊成一片，我这边只留了个 WebGL2 SDF 半成品。你别上完整引擎，把软阴影 raymarch 实验补到能跑、测试全绿，禁止 Docker。

具体点：
1) 打开 index.html（npm start / python3 -m http.server 8812 --directory .）：左画布右参数；正常启动 #status=ready。
2) src/math/sdf.js：`sdSphere` / `sdPlane` / `sceneSDF`（球+地面）要和测试数值对齐；`softShadow(ro, rd, mint, maxt, k)` 按 SDF 步进算遮挡因子（0..1）。
3) src/math/raymarch.js：`march(ro, rd, maxSteps, eps)` 返回 hit/t/p；未命中要有明确标记。
4) src/renderer.js：全屏三角 + fragment 里 raymarch；主光方向可调；把 softShadow 乘进着色。
5) src/ui/controls.js：k（软度）/ 光方位滑杆，Capture PNG，#stats 写出 steps 与 k。
6) shader 放 src/shaders/。别改弱测试，原生 ESM。分文件短命令写，写完就 npm test，挂了再修到过。
