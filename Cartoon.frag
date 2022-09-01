#if CARTOON_ENABLED == 1
/**
 * Cartoon
 * by Christian Cann Schuldt Jensen ~ CeeJay.dk
 *
 * Ported to glsl by kevinlekiller - 2022
 */
/*
    The MIT License (MIT)

    Copyright (c) 2014 CeeJayDK

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

void shader_cartoon() {
    vec3 coefLuma = vec3(0.2126, 0.7152, 0.0722);

    float diff1 = dot(coefLuma, texture(g_Texture, g_oTexcoord + g_PixelSize).rgb);
    diff1 = dot(vec4(coefLuma, -1.0), vec4(texture(g_Texture, g_oTexcoord - g_PixelSize).rgb, diff1));
    float diff2 = dot(coefLuma, texture(g_Texture, g_oTexcoord + g_PixelSize * vec2(1.0, -1.0)).rgb);
    diff2 = dot(vec4(coefLuma, -1.0), vec4(texture(g_Texture, g_oTexcoord + g_PixelSize * vec2(-1.0, 1.0)).rgb, diff2));

    float edge = dot(vec2(diff1, diff2), vec2(diff1, diff2));

    g_Color.rgb = clamp(pow(abs(edge), CARTOON_EDGE_SLOPE) * -CARTOON_POWER + g_Color.rgb, 0.0, 1.0);
}
#endif // CARTOON_ENABLED
