#if BLOOM_ENABLED == 1
/*
https://github.com/spite/Wagner/blob/master/fragment-shaders/bloom2-fs.glsl

The MIT License (MIT)

Copyright (c) 2014 Jaume Sanchez
All shaders are copyright of their respective authors.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

void shader_bloom() {
    vec4 sum = vec4(0);
    for (int num = -2; num <= 2; num++) {
        for (int i = -2; i <= 2; i++) {
            sum += texture(g_Texture, g_TexCoord + vec2(i, num) * BLOOM_RADIUS);
        }
    }
    sum /= 25.0;
    if (length(sum) > BLOOM_THRESHOLD) {
        g_Color += sum * BLOOM_STRENGTH;
    }
}

#endif //BLOOM_ENABLED
