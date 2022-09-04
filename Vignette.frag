#if VIGNETTE_ENABLED == 1
/**
 * Vignette version 1.3
 * by Christian Cann Schuldt Jensen ~ CeeJay.dk
 *
 * Darkens the edges of the image to make it look more like it was shot with a camera lens.
 * May cause banding artifacts.
 *
 * Type 0 ported to glsl by kevinlekiller - 2022.
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

void shader_vignette() {
    vec2 distance_xy = g_TexCoord - VIGNETTE_CENTER;
    distance_xy *= vec2((1.0 / g_TextureSize.x) / (1.0 / g_TextureSize.y), VIGNETTE_RATIO);
    distance_xy /= VIGNETTE_RADIUS;
    g_Color.rgb *= (1.0 + pow(dot(distance_xy, distance_xy), VIGNETTE_SLOPE * 0.5) * VIGNETTE_AMOUNT);
}

#endif // VIGNETTE_ENABLED
