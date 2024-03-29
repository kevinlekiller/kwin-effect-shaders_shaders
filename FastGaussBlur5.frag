#if FAST_GAUSS_BLURV_ENABLED == 1
/*
The MIT License (MIT) Copyright (c) 2015 Jam3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
void shader_fast_gaussian_blurV() {
    vec2 blurOffset = (vec2(1.3333333333333333) * vec2(FGBV_HORIZONTAL_STRENGTH, FGBV_VERTICAL_STRENGTH)) / g_TextureSize;
    g_Color *= 0.29411764705882354;
    g_Color += texture(g_Texture, g_TexCoord + blurOffset) * 0.35294117647058826;
    g_Color += texture(g_Texture, g_TexCoord - blurOffset) * 0.35294117647058826;
}
#endif
