#if DALTONIZE_ENABLED == 1

/*
    https://github.com/patriciogonzalezvivo/lygia/blob/main/color/daltonize.glsl
    Copyright (c) 2021 Patricio Gonzalez Vivo.
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

vec3 daltonization_lms2rgb(vec3 lms) {
    return vec3(
        (0.0809444479 * lms.x) + (-0.130504409 * lms.y) + (0.116721066 * lms.z),
        (-0.0102485335 * lms.x) + (0.0540193266 * lms.y) + (-0.113614708 * lms.z),
        (-0.000365296938 * lms.x) + (-0.00412161469 * lms.y) + (0.693511405 * lms.z)
    );
}

vec3 daltonization_rgb2lms(vec3 rgb) {
    return vec3(
        (17.8824 * rgb.r) + (43.5161 * rgb.g) + (4.11935 * rgb.b),
        (3.45565 * rgb.r) + (27.1554 * rgb.g) + (3.86714 * rgb.b),
        (0.0299566 * rgb.r) + (0.184309 * rgb.g) + (1.46709 * rgb.b)
    );
}

// For some reason, setting the function name to shader_daltonize doesn't work.
void shader_daltonization() {
    vec3 lms;
    vec3 outputColor = g_Color.rgb;
    switch (DALTONIZE_METHOD) {
        case 1: // Protanopia
            outputColor = vec3(g_Color.r * 0.56667 + g_Color.g * 0.43333 + g_Color.b * 0.00000,
                g_Color.r * 0.55833 + g_Color.g * 0.44267 + g_Color.b * 0.00000,
                g_Color.r * 0.00000 + g_Color.g * 0.24167 + g_Color.b * 0.75833);
            break;
        case 2: // Protanomaly
            outputColor = vec3(g_Color.r * 0.81667 + g_Color.g * 0.18333 + g_Color.b * 0.00000,
                g_Color.r * 0.33333 + g_Color.g * 0.66667 + g_Color.b * 0.00000,
                g_Color.r * 0.00000 + g_Color.g * 0.12500 + g_Color.b * 0.87500);
            break;
        case 3: // Deuteranope
            lms = daltonization_rgb2lms(g_Color.rgb);
            lms.x = 1.0 * lms.x + 0.0 * lms.y + 0.0 * lms.z;
            lms.y = 0.494207 * lms.x + 0.0 * lms.y + 1.24827 * lms.z;
            lms.z = 0.0 * lms.x + 0.0 * lms.y + 1.0 * lms.z;
            outputColor =  daltonization_lms2rgb(lms);
            break;
        case 4: // Deuteranopia
            outputColor = vec3(g_Color.r * 0.62500 + g_Color.g * 0.37500 + g_Color.b * 0.00000,
                g_Color.r * 0.70000 + g_Color.g * 0.30000 + g_Color.b * 0.00000,
                g_Color.r * 0.00000 + g_Color.g * 0.30000 + g_Color.b * 0.70000);
            break;
        case 5: // Deuteranomaly
            outputColor = vec3(g_Color.r * 0.80000 + g_Color.g * 0.20000 + g_Color.b * 0.00000,
                g_Color.r * 0.00000 + g_Color.g * 0.25833 + g_Color.b * 0.74167,
                g_Color.r * 0.00000 + g_Color.g * 0.14167 + g_Color.b * 0.85833);
            break;
        case 6: // Tritanope
            lms = daltonization_rgb2lms(g_Color.rgb);
            lms.x = 1.0 * lms.x + 0.0 * lms.y + 0.0 * lms.z;
            lms.y = 0.0 * lms.x + 1.0 * lms.y + 0.0 * lms.z;
            lms.z = -0.395913 * lms.x + 0.801109 * lms.y + 0.0 * lms.z;
            outputColor = daltonization_lms2rgb(lms);
            break;
        case 7: // Tritanopia
            outputColor = vec3(g_Color.r * 0.95 + g_Color.g * 0.05 + g_Color.b * 0.00000,
                g_Color.r * 0.00000 + g_Color.g * 0.43333 + g_Color.b * 0.56667,
                g_Color.r * 0.00000 + g_Color.g * 0.47500 + g_Color.b * 0.52500);
            break;
        case 8: // Tritanomaly
            outputColor = vec3(g_Color.r * 0.96667 + g_Color.g * 0.33333 + g_Color.b * 0.00000,
                g_Color.r * 0.00000 + g_Color.g * 0.73333 + g_Color.b * 0.26667,
                g_Color.r * 0.00000 + g_Color.g * 0.18333 + g_Color.b * 0.81667);
            break;
        case 9: // Achromatopsia
            outputColor = vec3(g_Color.r * 0.299 + g_Color.g * 0.587 + g_Color.b * 0.114,
                g_Color.r * 0.299 + g_Color.g * 0.587 + g_Color.b * 0.114,
                g_Color.r * 0.299 + g_Color.g * 0.587 + g_Color.b * 0.114);
            break;
        case 10: // Achromatomaly
            outputColor = vec3(g_Color.r * 0.618 + g_Color.g * 0.320 + g_Color.b * 0.062,
                g_Color.r * 0.163 + g_Color.g * 0.775 + g_Color.b * 0.062,
                g_Color.r * 0.163 + g_Color.g * 0.320 + g_Color.b * 0.516);
            break;
        default:
        case 0: // Protanope
            lms = daltonization_rgb2lms(g_Color.rgb);
            lms.x = 0.0 * lms.x + 2.02344 * lms.y + -2.52581 * lms.z;
            lms.y = 0.0 * lms.x + 1.0 * lms.y + 0.0 * lms.z;
            lms.z = 0.0 * lms.x + 0.0 * lms.y + 1.0 * lms.z;
            outputColor = daltonization_lms2rgb(lms);
            break;
    }
    if (DALTONIZATION_CORRECTION > 0) {
        // Isolate invisible rgbs to rgb vision deficiency (calculate error matrix)
        vec3 error = (g_Color.rgb - outputColor);
        // Shift rgbs towards visible spectrum (apply error modifications)
        vec3 correction;
        correction.r = 0.0; // (error.r * 0.0) + (error.g * 0.0) + (error.b * 0.0);
        correction.g = (error.r * 0.7) + (error.g * 1.0); // + (error.b * 0.0);
        correction.b = (error.r * 0.7) + (error.b * 1.0); // + (error.g * 0.0);
        // Add compensation to original values
        outputColor = g_Color.rgb + correction;
    }
    g_Color.rgb = outputColor;
}

#endif //DALTONIZE_ENABLED
