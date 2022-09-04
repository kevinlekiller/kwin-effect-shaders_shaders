#if INVERT_ENABLED == 1
/**
 *  Copyright (C) 2022  kevinlekiller
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License
 *  as published by the Free Software Foundation; either version 2
 *  of the License, or (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *  https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 */

void shader_invert() {
    if (INVERT_RED == 1) {
        g_Color.r = 1.0 - g_Color.r;
    }
    if (INVERT_GREEN == 1) {
        g_Color.g = 1.0 - g_Color.g;
    }
    if (INVERT_BLUE == 1) {
        g_Color.b = 1.0 - g_Color.b;
    }
    if(INVERT_ALPHA == 1) {
        g_Color.a = 1.0 - g_Color.a;
    }
}
#endif
