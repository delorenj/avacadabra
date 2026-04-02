-- Seed the 20-day AvaMath curriculum starting April 10, 2026
-- April 2–9 is vacation (Texas!), so first session = Friday April 10

INSERT INTO teaching_agenda (date, concept, title, notes, standard, day_number) VALUES

-- ══ Week 1: Fractions as Numbers & Operations (5.NF) ══

('2026-04-10', 'fractions', 'Fractions on a Number Line', '<b>Warm-Up:</b> Compare pairs like 1/2 vs 3/4, 2/3 vs 3/5.<br/><b>Practice:</b> Draw a number line 0–1, mark 1/2, 1/4, 3/4. Use fraction bars to compare 3/8 and 5/12. Add fractions with like denominators.<br/><b>Exit Ticket:</b> Compute 5/6 − 1/3. Is 3/8 closer to 0 or 1? Sketch 5/8 on a bar.', '5.NF.A', 1),

('2026-04-13', 'fractions', 'Equivalent Fractions & Addition with Unlike Denominators', '<b>Warm-Up:</b> Solve 2/3 + 3/3, 5/8 − 1/8, compare 4/5 vs 7/10.<br/><b>Practice:</b> Identify equivalent fractions (1/2 = 2/4 = 3/6). Find common denominators to add 1/4 + 1/3. Subtract with unlike denominators (3/5 − 1/4).<br/><b>Exit Ticket:</b> Compute 1/3 + 2/5. Explain how you chose a common denominator. Sketch 7/12.', '5.NF.A', 2),

('2026-04-14', 'fractions', 'Mixed Numbers & Improper Fractions', '<b>Warm-Up:</b> Convert 9/4 to mixed number. Convert 1 1/2 to improper fraction.<br/><b>Practice:</b> Explain mixed vs improper (2 1/4 vs 9/4). Solve 1 1/2 + 3/4. Subtract 2 2/3 − 5/6.<br/><b>Exit Ticket:</b> Convert 13/5 to mixed number. Explain why 9/4 = 2 1/4. Sketch 7/3 on a number line.', '5.NF.A', 3),

('2026-04-15', 'word-problems', 'Spiral Review & Word Problems', '<b>Warm-Up:</b> Which is larger: 3/5 or 4/7? Compute 2/3 + 1/6. Convert 11/3 to mixed number.<br/><b>Practice:</b> Review fraction concepts from Days 1–3. Word problem: "Ava baked 3/4 of a pan of brownies. She ate 1/3 and gave 1/4 to a friend. What fraction is left?"<br/><b>Exit Ticket:</b> Compute 2/5 + 3/8. Explain brownie steps. Sketch remaining fraction.', '5.NF.A', 4),

('2026-04-16', 'fractions', 'Fraction Fluency & Family Game', '<b>Warm-Up:</b> Mental math race — write equivalent fractions for 2/3 in 2 minutes.<br/><b>Fluency Game:</b> Create fraction flashcards (3/5, 4/7, 7/9). Shuffle, draw two, decide which is greater using benchmarks or cross-multiplication. Play with family — first to 10 points wins!<br/><b>Exit Ticket:</b> Compute 7/8 − 3/16. Why is 3/8 less than 1/2? Sketch 5/6.', '5.NF.A', 5),

-- ══ Week 2: Fraction Multiplication & Division (5.NF.B) ══

('2026-04-17', 'fraction-multiplication', 'Fraction × Whole Number', '<b>Warm-Up:</b> Recall 2/3 of 6 means 6 × 2/3. Compute 3/4 of 8.<br/><b>Practice:</b> Draw rectangle width 8, height 3/4. Shade 8 × 3/4. Compute 5/6 × 12 with repeated addition and area models. Try 2/3 × 15 and 7/8 × 16.<br/><b>Exit Ticket:</b> Compute 3/4 × 12. Explain visualization. Sketch 2/3 × 9 as area model.', '5.NF.B.4', 6),

('2026-04-20', 'fraction-multiplication', 'Fraction × Fraction (Area Model)', '<b>Warm-Up:</b> Multiply 1/2 × 1/3. Multiply 3/5 × 2/3 mentally.<br/><b>Practice:</b> Rectangle divided into thirds and fourths — shade overlap for 1/3 × 1/4 = 1/12. Practice 2/5 × 3/4 with area model (6/20 = 3/10). Challenge: 5/6 × 3/7, simplify.<br/><b>Exit Ticket:</b> Compute 4/5 × 2/3. Explain overlap. Sketch 2/3 × 2/5.', '5.NF.B.4', 7),

('2026-04-21', 'fraction-multiplication', 'Division of a Whole Number by a Unit Fraction', '<b>Warm-Up:</b> Dividing by a fraction = multiplying by its reciprocal. Compute 4 ÷ 1/2.<br/><b>Practice:</b> Write 6 ÷ 1/3 as "How many 1/3s make 6?" Draw number line — answer is 18. Solve 8 ÷ 1/4 with bars cut into quarters. Try 5 ÷ 2/3 using reciprocal.<br/><b>Exit Ticket:</b> Compute 10 ÷ 1/5. Explain why dividing by a fraction yields larger number. Sketch 7/2 ÷ 1/4.', '5.NF.B.7', 8),

('2026-04-22', 'fraction-multiplication', 'Division of Unit Fraction by Whole Number & Spiral Review', '<b>Warm-Up:</b> Compute 1/2 ÷ 3 and 1/4 ÷ 5 using reciprocal.<br/><b>Practice:</b> Show 1/3 ÷ 4 on number line: divide 1/3 into 4 equal parts → 1/12. Practice 1/5 ÷ 2. Explain why result is half of 1/5. Spiral: Add 2/5 + 3/10. Challenge: 1/8 ÷ 3.<br/><b>Exit Ticket:</b> Compute 1/6 ÷ 2. Explain meaning. Add 3/4 + 2/5 and simplify.', '5.NF.B.7', 9),

('2026-04-23', 'word-problems', 'Real-World Problem & Game', '<b>Warm-Up:</b> Multiply 3/4 × 5/6. Divide 9 ÷ 3/4.<br/><b>Performance Task:</b> "A recipe calls for 2/3 cup of sugar. Ava only has a 1/4 cup measure. How many 1/4 cups does she need? If she triples the recipe, how many cups total?" Draw diagram and write equation.<br/><b>Game:</b> Fraction board game — roll die, move forward, multiply that fraction by 2. First to end wins!<br/><b>Exit Ticket:</b> Solve recipe problem. Explain why answer makes sense.', '5.NF.B', 10),

-- ══ Week 3: Decimals & Place Value (5.NBT) ══

('2026-04-24', 'decimals', 'Decimal Basics & Place Value', '<b>Warm-Up:</b> Write 3.47 in expanded form. Identify tenths/hundredths. Compare 0.62 and 0.6.<br/><b>Practice:</b> Create place-value chart (ones | tenths | hundredths | thousandths). Write 4.506, shift decimal left (÷10) and right (×10). Use base-ten blocks for 0.75. Order: 0.43, 0.4, 0.431, 0.409.<br/><b>Exit Ticket:</b> Write 2.93 in expanded form. Why is 0.7 > 0.65? Sketch grid for 0.28.', '5.NBT.A', 11),

('2026-04-27', 'decimals', 'Decimal Operations: Addition & Subtraction', '<b>Warm-Up:</b> Add 0.3 + 0.45 mentally. Subtract 1.2 − 0.68.<br/><b>Practice:</b> Add 3.57 + 2.3 — line up decimal points. Subtract 5 − 3.78 (pad with zeros: 5.00 − 3.78). Convert 3/5 to decimal and add to 1.23.<br/><b>Exit Ticket:</b> Compute 4.8 − 2.35. Explain borrowing. Sketch number line for 1.2 − 0.65.', '5.NBT.B', 12),

('2026-04-28', 'decimals', 'Decimal Multiplication', '<b>Warm-Up:</b> Multiply 0.4 × 3 and 0.25 × 2 mentally.<br/><b>Practice:</b> Multiply 1.2 × 0.5 — multiplying by < 1 gives smaller product. Multiply 2.3 × 0.4 — count decimal places. Convert 3/4 to decimal, multiply by 0.6, compare to 3/4 × 6/10.<br/><b>Exit Ticket:</b> Compute 3.6 × 0.25. Explain decimal placement. Sketch area model for 0.3 × 0.7.', '5.NBT.B.7', 13),

('2026-04-29', 'decimals', 'Decimal Division & Spiral Review', '<b>Warm-Up:</b> Compute 2.4 ÷ 4 and 1.8 ÷ 0.3 mentally.<br/><b>Practice:</b> Divide 4.8 ÷ 0.6 by scaling (multiply both by 10 → 48 ÷ 6 = 8). Divide 3.75 ÷ 0.25 by scaling (375 ÷ 25). Spiral: Compare 5/6 and 0.78 using fraction-to-decimal conversion.<br/><b>Exit Ticket:</b> Compute 2.56 ÷ 0.4. Explain power-of-ten scaling. Compare 0.72 and 7/10.', '5.NBT.B.7', 14),

('2026-04-30', 'word-problems', 'Application: Shopping & Budgeting', '<b>Warm-Up:</b> Price flash: toy $3.45 + snack $1.29 — estimate total without calculator.<br/><b>Performance Task:</b> Create a mini store with 5 items priced $0.50–$5.00. Choose 3 items, find total, calculate change from $20. Convert one price to a fraction of a dollar. Optional: design a 10% off coupon.<br/><b>Exit Ticket:</b> List items and prices. Show calculations. Explain how decimals relate to money.', '5.NBT.B, 5.NF.A', 15),

-- ══ Week 4: Geometry, Volume & Word Problems (5.MD, 5.G, 5.NF) ══

('2026-05-01', 'volume-geometry', 'Volume Basics & Unit Cubes', '<b>Warm-Up:</b> Calculate 3 × 2 × 4. What does this represent for a rectangular prism?<br/><b>Practice:</b> Build a prism with blocks (3 × 2 × 2). Count cubes, write formula V = l × w × h. Draw prism on isometric paper. Compare volumes: 4 × 3 × 2 vs 5 × 2 × 1.<br/><b>Exit Ticket:</b> Volume of 6 × 3 × 1. Explain why changing one dimension changes volume. Sketch prism with volume 24.', '5.MD.C', 16),

('2026-05-04', 'volume-geometry', 'Volume with Fractions & Decimals', '<b>Warm-Up:</b> Convert 1.5 liters to mL. Convert 3/4 cubic feet to cubic inches.<br/><b>Practice:</b> Find volume of 3.5 × 2 × 1.2 units using decimal multiplication. Solve: box is 5/6 ft × 1.5 ft × 2/3 ft — find volume in cubic feet. Compare two containers in different units.<br/><b>Exit Ticket:</b> Volume of 2.5 × 1 × 0.4. Convert 5/6 ft to decimal. Sketch prism for box problem.', '5.MD.C', 17),

('2026-05-05', 'volume-geometry', 'Coordinate Geometry', '<b>Warm-Up:</b> Plot (2, 3) and (5, 1) on coordinate grid. Label axes.<br/><b>Practice:</b> Introduce first-quadrant coordinate plane. Plot 4 points forming a rectangle — find length, width, area, perimeter. Plot A(1,1), B(3,4), C(6,4) — draw triangle ABC, calculate base and height for area.<br/><b>Exit Ticket:</b> Plot D(2,5). What shape is ABCD? Explain triangle area calculation. Sketch point E so ABCE forms a trapezoid.', '5.G.A', 18),

('2026-05-06', 'volume-geometry', 'Classifying 2D Shapes & Spiral Review', '<b>Warm-Up:</b> Define parallelogram. Is a square a rectangle? Is a rectangle a square?<br/><b>Practice:</b> List properties of squares, rectangles, rhombi, trapezoids. Create Venn diagram showing all are quadrilaterals. Classify drawn shapes by properties. Spiral: Solve 2/3 + 0.25 and graph on number line.<br/><b>Exit Ticket:</b> Explain why every square is a rectangle but not vice versa. Compute 2/3 + 0.25. Sketch a rhombus.', '5.G.B', 19),

('2026-05-07', 'volume-geometry', 'Culminating Project & Assessment', '<b>Warm-Up:</b> Review vocabulary: volume, prism, parallelogram, decimal, numerator.<br/><b>Project:</b> Design a "Dream Treehouse" using rectangular prisms. Draw floor plan on grid paper, label l × w × h for each section. Calculate volume of each room and total volume. Write a word problem involving fractions and decimals (paint coverage, dividing supplies). Present verbally or in writing with at least one graph.<br/><b>Assessment Rubric:</b> 4-point scale (Exceeds, Meets, Approaching, Beginning) on volume calculations, problem writing, presentation, reflection.', '5.MD.C, 5.G, 5.NF, 5.NBT', 20)

ON CONFLICT (date) DO NOTHING;
