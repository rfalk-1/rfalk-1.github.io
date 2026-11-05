window.RECALL_BANK = {
  "topics": [
    {
      "id": "taylor",
      "title": "Taylor 展开",
      "subtitle": "在零点附近，记住每一项",
      "description": "五个常用展开式；填写到指定阶数的完整多项式。",
      "source": "Taylor expansion.png"
    },
    {
      "id": "hyperbolic",
      "title": "双曲函数",
      "subtitle": "指数定义与反双曲函数",
      "description": "六个定义式；完整默写指数形式、比值或对数形式。",
      "source": "Hyperbolic Function.png"
    },
    {
      "id": "derivative",
      "title": "导数公式",
      "subtitle": "基础 · 三角 · 反三角",
      "description": "20 条求导公式；填写完整导函数表达式。",
      "source": "Derivative.png"
    },
    {
      "id": "antiderivative",
      "title": "原函数公式",
      "subtitle": "从函数回忆它的原函数",
      "description": "14 条原函数公式；填写完整原函数，+C 可省略。",
      "source": "Antidifferentiation.png"
    }
  ],
  "questions": [
    {
      "id": "taylor-01",
      "topic": "taylor",
      "title": "指数函数",
      "prompt": "写出下列函数在 x = 0 处到 3 阶的完整 Taylor 多项式。",
      "formula": "e^x=\\boxed{\\text{完整多项式}}+o(x^{3})",
      "context": "",
      "expected": "1+x+x^2/2+x^3/6",
      "answerLatex": "1+x+\\frac{x^2}{2}+\\frac{x^3}{6}",
      "note": "填写整个多项式，不填写等号左边或余项。这里的小 o 表示余项除以相应的幂后趋于 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "taylor-02",
      "topic": "taylor",
      "title": "对数函数",
      "prompt": "写出下列函数在 x = 0 处到 3 阶的完整 Taylor 多项式。",
      "formula": "\\ln(1+x)=\\boxed{\\text{完整多项式}}+o(x^{3})",
      "context": "",
      "expected": "x-x^2/2+x^3/3",
      "answerLatex": "x-\\frac{x^2}{2}+\\frac{x^3}{3}",
      "note": "填写整个多项式，不填写等号左边或余项。这里的小 o 表示余项除以相应的幂后趋于 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "taylor-03",
      "topic": "taylor",
      "title": "正弦函数",
      "prompt": "写出下列函数在 x = 0 处到 5 阶的完整 Taylor 多项式。",
      "formula": "\\sin x=\\boxed{\\text{完整多项式}}+o(x^{5})",
      "context": "",
      "expected": "x-x^3/6+x^5/120",
      "answerLatex": "x-\\frac{x^3}{6}+\\frac{x^5}{120}",
      "note": "填写整个多项式，不填写等号左边或余项。这里的小 o 表示余项除以相应的幂后趋于 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "taylor-04",
      "topic": "taylor",
      "title": "余弦函数",
      "prompt": "写出下列函数在 x = 0 处到 4 阶的完整 Taylor 多项式。",
      "formula": "\\cos x=\\boxed{\\text{完整多项式}}+o(x^{4})",
      "context": "",
      "expected": "1-x^2/2+x^4/24",
      "answerLatex": "1-\\frac{x^2}{2}+\\frac{x^4}{24}",
      "note": "填写整个多项式，不填写等号左边或余项。这里的小 o 表示余项除以相应的幂后趋于 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "taylor-05",
      "topic": "taylor",
      "title": "正切函数",
      "prompt": "写出下列函数在 x = 0 处到 5 阶的完整 Taylor 多项式。",
      "formula": "\\tan x=\\boxed{\\text{完整多项式}}+o(x^{5})",
      "context": "",
      "expected": "x+x^3/3+2*x^5/15",
      "answerLatex": "x+\\frac{x^3}{3}+\\frac{2x^5}{15}",
      "note": "填写整个多项式，不填写等号左边或余项。这里的小 o 表示余项除以相应的幂后趋于 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "hyperbolic-01",
      "topic": "hyperbolic",
      "title": "双曲正弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\sinh x=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "(e^x-e^(-x))/2",
      "answerLatex": "\\frac{e^x-e^{-x}}{2}",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "hyperbolic-02",
      "topic": "hyperbolic",
      "title": "双曲余弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\cosh x=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "(e^x+e^(-x))/2",
      "answerLatex": "\\frac{e^x+e^{-x}}{2}",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "hyperbolic-03",
      "topic": "hyperbolic",
      "title": "双曲正切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\tanh x=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "sinh(x)/cosh(x)",
      "answerLatex": "\\frac{\\sinh x}{\\cosh x}",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "hyperbolic-04",
      "topic": "hyperbolic",
      "title": "反双曲正弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\operatorname{arsinh}x=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "ln(x+sqrt(x^2+1))",
      "answerLatex": "\\ln\\left(x+\\sqrt{x^2+1}\\right)",
      "note": "定义域：所有实数。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "hyperbolic-05",
      "topic": "hyperbolic",
      "title": "反双曲余弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\operatorname{arcosh}x=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "ln(x+sqrt(x^2-1))",
      "answerLatex": "\\ln\\left(x+\\sqrt{x^2-1}\\right)",
      "note": "实数范围内 x ≥ 1，取非负的反函数分支。",
      "variables": "x",
      "samples": [
        1.1,
        2,
        3
      ],
      "mode": "expression"
    },
    {
      "id": "hyperbolic-06",
      "topic": "hyperbolic",
      "title": "反双曲正切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\operatorname{artanh}x=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "ln((1+x)/(1-x))/2",
      "answerLatex": "\\frac{1}{2}\\ln\\left(\\frac{1+x}{1-x}\\right)",
      "note": "实数范围内 −1 < x < 1。",
      "variables": "x",
      "samples": [
        -0.6,
        0,
        0.6
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-01",
      "topic": "derivative",
      "title": "常数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(C)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "0",
      "answerLatex": "0",
      "note": "C 为常数。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-02",
      "topic": "derivative",
      "title": "幂函数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(x^n)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "n*x^(n-1)",
      "answerLatex": "nx^{n-1}",
      "note": "n 为常数，公式在幂函数可导的范围内成立。",
      "variables": "xn",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-03",
      "topic": "derivative",
      "title": "常数倍",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(cf(x))'=\\boxed{\\text{完整表达式}}",
      "context": "c 为常数；请用 f'(x) 表示 f 的导函数。",
      "expected": "c*f'(x)",
      "answerLatex": "cf'(x)",
      "note": "c 为常数。",
      "variables": "cD",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-04",
      "topic": "derivative",
      "title": "自然指数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(e^x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "e^x",
      "answerLatex": "e^x",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-05",
      "topic": "derivative",
      "title": "一般指数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(a^x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "a^x*ln(a)",
      "answerLatex": "a^x\\ln a",
      "note": "a > 0；与对数的底数条件有所区别。",
      "variables": "xa",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-06",
      "topic": "derivative",
      "title": "一般对数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\log_a x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "1/(x*ln(a))",
      "answerLatex": "\\frac{1}{x\\ln a}",
      "note": "a > 0，a ≠ 1，x > 0。",
      "variables": "xa",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-07",
      "topic": "derivative",
      "title": "自然对数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\ln x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "1/x",
      "answerLatex": "\\frac{1}{x}",
      "note": "x > 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-08",
      "topic": "derivative",
      "title": "绝对值的对数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\ln|x|)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "1/x",
      "answerLatex": "\\frac{1}{x}",
      "note": "x ≠ 0；负半轴上也成立。",
      "variables": "x",
      "samples": [
        -2,
        -0.5,
        0.5,
        2
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-09",
      "topic": "derivative",
      "title": "正弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\sin x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "cos(x)",
      "answerLatex": "\\cos x",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-10",
      "topic": "derivative",
      "title": "余弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\cos x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "-sin(x)",
      "answerLatex": "-\\sin x",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-11",
      "topic": "derivative",
      "title": "正切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\tan x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "sec(x)^2",
      "answerLatex": "\\sec^2 x",
      "note": "cos x ≠ 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-12",
      "topic": "derivative",
      "title": "余切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\cot x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "-csc(x)^2",
      "answerLatex": "-\\csc^2 x",
      "note": "sin x ≠ 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-13",
      "topic": "derivative",
      "title": "正割",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\sec x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "sec(x)*tan(x)",
      "answerLatex": "\\sec x\\tan x",
      "note": "cos x ≠ 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-14",
      "topic": "derivative",
      "title": "余割",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\csc x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "-csc(x)*cot(x)",
      "answerLatex": "-\\csc x\\cot x",
      "note": "sin x ≠ 0。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-15",
      "topic": "derivative",
      "title": "反正弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\arcsin x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "1/sqrt(1-x^2)",
      "answerLatex": "\\frac{1}{\\sqrt{1-x^2}}",
      "note": "−1 < x < 1。",
      "variables": "x",
      "samples": [
        -0.6,
        0,
        0.6
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-16",
      "topic": "derivative",
      "title": "反余弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\arccos x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "-1/sqrt(1-x^2)",
      "answerLatex": "-\\frac{1}{\\sqrt{1-x^2}}",
      "note": "−1 < x < 1。",
      "variables": "x",
      "samples": [
        -0.6,
        0,
        0.6
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-17",
      "topic": "derivative",
      "title": "反正切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\arctan x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "1/(1+x^2)",
      "answerLatex": "\\frac{1}{1+x^2}",
      "note": "",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-18",
      "topic": "derivative",
      "title": "反余切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\operatorname{arccot}x)'=\\boxed{\\text{完整表达式}}",
      "context": "反余切取值范围为 (0, π)。",
      "expected": "-1/(1+x^2)",
      "answerLatex": "-\\frac{1}{1+x^2}",
      "note": "采用课件中的递减反余切分支（值域为 (0, π)）。",
      "variables": "x",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-19",
      "topic": "derivative",
      "title": "反正割",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\operatorname{arcsec}x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "1/(abs(x)*sqrt(x^2-1))",
      "answerLatex": "\\frac{1}{|x|\\sqrt{x^2-1}}",
      "note": "|x| > 1；分母中的绝对值不能省略。",
      "variables": "x",
      "samples": [
        -3,
        -2,
        2,
        3
      ],
      "mode": "expression"
    },
    {
      "id": "derivative-20",
      "topic": "derivative",
      "title": "反余割",
      "prompt": "填写右侧的完整表达式。",
      "formula": "(\\operatorname{arccsc}x)'=\\boxed{\\text{完整表达式}}",
      "context": "",
      "expected": "-1/(abs(x)*sqrt(x^2-1))",
      "answerLatex": "-\\frac{1}{|x|\\sqrt{x^2-1}}",
      "note": "|x| > 1；采用课件中的反函数分支。",
      "variables": "x",
      "samples": [
        -3,
        -2,
        2,
        3
      ],
      "mode": "expression"
    },
    {
      "id": "antiderivative-01",
      "topic": "antiderivative",
      "title": "常数倍",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int cf(x)\\,dx=\\boxed{\\text{完整表达式}}",
      "context": "已知 F′(x) = f(x)，c 为常数。 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "c*F(x)",
      "answerLatex": "cF(x)+C",
      "note": "已知 F′(x) = f(x)，c 为常数。",
      "variables": "cFC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "antiderivative-02",
      "topic": "antiderivative",
      "title": "和的原函数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int(f(x)+g(x))\\,dx=\\boxed{\\text{完整表达式}}",
      "context": "已知 F′(x) = f(x)，G′(x) = g(x)。 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "F(x)+G(x)",
      "answerLatex": "F(x)+G(x)+C",
      "note": "已知 F′(x) = f(x)，G′(x) = g(x)。",
      "variables": "FGC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "expression"
    },
    {
      "id": "antiderivative-03",
      "topic": "antiderivative",
      "title": "幂函数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int x^n\\,dx=\\boxed{\\text{完整表达式}}",
      "context": "n ≠ −1。 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "x^(n+1)/(n+1)",
      "answerLatex": "\\frac{x^{n+1}}{n+1}+C",
      "note": "n ≠ −1；在幂函数有定义的区间内使用。",
      "variables": "xnC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-04",
      "topic": "antiderivative",
      "title": "倒数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\frac{1}{x}\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "ln(abs(x))",
      "answerLatex": "\\ln|x|+C",
      "note": "在不穿过 0 的区间内成立；x 可以为负。",
      "variables": "xC",
      "samples": [
        -2,
        -0.5,
        0.5,
        2
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-05",
      "topic": "antiderivative",
      "title": "自然指数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int e^x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "e^x",
      "answerLatex": "e^x+C",
      "note": "",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-06",
      "topic": "antiderivative",
      "title": "一般指数",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int b^x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "b^x/ln(b)",
      "answerLatex": "\\frac{b^x}{\\ln b}+C",
      "note": "b > 0，b ≠ 1；b = 1 时单独积分。",
      "variables": "xbC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-07",
      "topic": "antiderivative",
      "title": "余弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\cos x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "sin(x)",
      "answerLatex": "\\sin x+C",
      "note": "",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-08",
      "topic": "antiderivative",
      "title": "正弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\sin x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "-cos(x)",
      "answerLatex": "-\\cos x+C",
      "note": "",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-09",
      "topic": "antiderivative",
      "title": "正割平方",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\sec^2x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "tan(x)",
      "answerLatex": "\\tan x+C",
      "note": "在 cos x ≠ 0 的区间内成立。",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-10",
      "topic": "antiderivative",
      "title": "正割与正切",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\sec x\\tan x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "sec(x)",
      "answerLatex": "\\sec x+C",
      "note": "在 cos x ≠ 0 的区间内成立。",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-11",
      "topic": "antiderivative",
      "title": "反正弦型",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\frac{1}{\\sqrt{1-x^2}}\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "arcsin(x)",
      "answerLatex": "\\arcsin x+C",
      "note": "−1 < x < 1；此处的反函数也常写作 sin⁻¹。",
      "variables": "xC",
      "samples": [
        -0.6,
        0,
        0.6
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-12",
      "topic": "antiderivative",
      "title": "反正切型",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\frac{1}{1+x^2}\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "arctan(x)",
      "answerLatex": "\\arctan x+C",
      "note": "此处的反函数也常写作 tan⁻¹。",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-13",
      "topic": "antiderivative",
      "title": "双曲余弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\cosh x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "sinh(x)",
      "answerLatex": "\\sinh x+C",
      "note": "",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    },
    {
      "id": "antiderivative-14",
      "topic": "antiderivative",
      "title": "双曲正弦",
      "prompt": "填写右侧的完整表达式。",
      "formula": "\\int\\sinh x\\,dx=\\boxed{\\text{完整表达式}}",
      "context": " 填写一个完整原函数即可；末尾的 +C 可写可不写。",
      "expected": "cosh(x)",
      "answerLatex": "\\cosh x+C",
      "note": "",
      "variables": "xC",
      "samples": [
        0.4,
        0.8,
        1.3
      ],
      "mode": "primitive"
    }
  ]
};
