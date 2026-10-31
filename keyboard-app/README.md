# Skill keyboard (embedded build)

The 3D skill keyboard from the second project. It needs React 19 / three 0.185,
so it is built separately and shown in the portfolio through
`src/components/SkillKeyboard.tsx`.

The board is a 4 x 8 grid (32 keys). Set the column count with `KEYBOARD_COLUMNS` and edit keys,
colours or descriptions in `src/data/constants.ts`. Each key's logo is a mono SVG in
`public/assets/keyboard/logos/<name>.svg`. Then rebuild:

    cd keyboard-app && npm install && npm run build

The build writes to `../public/skill-keyboard/`. Nothing else is needed for the
main site (`npm run dev` / `npm run build` there work as before).
