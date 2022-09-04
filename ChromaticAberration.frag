#if CHROMATICABERRATION_ENABLED == 1
/**
 * Chromatic Aberration
 * by Christian Cann Schuldt Jensen ~ CeeJay.dk
 *
 * Distorts the image by shifting each color component, which creates color artifacts similar to those in a very cheap lens or a cheap sensor.
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

void shader_chromatic_aberration() {
    vec3 color = g_Color.rgb;
    color.r = texture(g_Texture, g_TexCoord + (g_PixelSize * CHROMATICABERRATION_SHIFT)).r;
    color.b = texture(g_Texture, g_TexCoord - (g_PixelSize * CHROMATICABERRATION_SHIFT)).b;
    g_Color.rgb = mix(g_Color.rgb, color, CHROMATICABERRATION_STRENGTH);
}
#endif // CHROMATICABERRATION_ENABLED
