import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Loader2,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  FileCheck,
  Shield,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { message } from "../../comman/toaster-message/toasterMessage";
import {
  getQuestionsApi,
  submitAnswersApi,
  verifyQuestionsPaymentApi,
  validTypes,
} from "../../service/questionsService";
import logo from "../../assets/RedHeart-Logo-02.png";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const HiringForInternship = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchQuestions = async () => {
      try {
        const { questions: list } = await getQuestionsApi();
        if (!cancelled) setQuestions(list);
      } catch (err) {
        if (!cancelled) message.error("Failed to load questions.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchQuestions();
    return () => { cancelled = true; };
  }, []);

  const setAnswer = (questionText, value) => {
    setAnswers((prev) => ({ ...prev, [questionText]: value }));
  };

  const getAnswer = (questionText) => {
    const v = answers[questionText];
    if (v === undefined || v === null) return "";
    return Array.isArray(v) ? v : String(v);
  };
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleCheckboxChange = (questionText, option, checked) => {
    const current = getAnswer(questionText);
    const arr = typeof current === "string" && current ? current.split(",").map((s) => s.trim()) : [];
    if (checked) {
      if (!arr.includes(option)) arr.push(option);
    } else {
      const next = arr.filter((o) => o !== option);
      setAnswer(questionText, next.join(", "));
      return;
    }
    setAnswer(questionText, arr.join(", "));
  };

  const isCheckboxChecked = (questionText, option) => {
    const current = getAnswer(questionText);
    const arr = typeof current === "string" && current ? current.split(",").map((s) => s.trim()) : [];
    return arr.includes(option);
  };

  const buildSubmitPayload = () => {
    return questions.map((q) => ({
      question: q.question,
      answer: getAnswer(q.question),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildSubmitPayload();
    const missing = payload.filter((p) => !String(p.answer).trim());
    if (missing.length) {
      message.error("Please answer all questions.");
      return;
    }

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      message.error("Payment gateway could not be loaded.");
      return;
    }

    setSubmitLoading(true);
    try {
      const { razorpayOrderId, amount, key_id } = await submitAnswersApi(payload);

      const options = {
        key: key_id,
        amount: Number(amount) * 100,
        currency: "INR",
        order_id: razorpayOrderId,
        name: "RedHeart",
        description: "Internship Application Fee",
        image: logo,
        theme: { color: "#D32F2F" },
        handler: async function (response) {
          try {
            await verifyQuestionsPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            setPaymentSuccess(true);
            message.success("Application submitted and payment successful!");
          } catch (err) {
            message.error("Payment verification failed. Please contact support.");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      message.error(err?.response?.data?.message || err?.message || "Submission failed.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const renderQuestion = (q) => {
    let type = validTypes.includes(q.type) ? q.type : "Input";
    let options = Array.isArray(q.options) ? q.options : [];
    const value = getAnswer(q.question);

    const isSectorQuestion =
      typeof q.question === "string" &&
      q.question.trim() ===
      "Which sector would you like to do an internship in within an e-commerce company?";

    if (isSectorQuestion) {
      type = "Radio";
      options = [
        "Marketing (Digital)",
        "HR (Human Resource)",
        "Tech (frontend)",
        "Tech (Backend)",
        "Supply Chain & Category",
      ];
    }

    if (type === "Checkbox") {
      return (
        <div key={q._id} className="space-y-2">
          <p className="font-body text-sm font-medium text-black-charcoal mb-2">{q.question}</p>
          <div className="flex flex-wrap gap-3">
            {options.length
              ? options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCheckboxChecked(q.question, opt)}
                    onChange={(e) => handleCheckboxChange(q.question, opt, e.target.checked)}
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600 border-grey-300 rounded"
                  />
                  <span className="font-body text-sm text-grey-700">{opt}</span>
                </label>
              ))
              : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setAnswer(q.question, e.target.value)}
                  placeholder="Your answer"
                  className="flex-1 min-w-[200px] px-3 py-2 bg-grey-50 border border-grey-200 rounded-lg font-body text-sm focus:outline-none focus:border-accent-rose-600"
                />
              )}
          </div>
        </div>
      );
    }

    if (type === "Radio") {
      return (
        <div key={q._id} className="space-y-2">
          <p className="font-body text-sm font-medium text-black-charcoal mb-2">{q.question}</p>
          <div className="flex flex-wrap gap-3">
            {options.length
              ? options.map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`radio-${q._id}`}
                    checked={value === opt}
                    onChange={() => setAnswer(q.question, opt)}
                    className="w-4 h-4 text-accent-rose-600 focus:ring-accent-rose-600 border-grey-300"
                  />
                  <span className="font-body text-sm text-grey-700">{opt}</span>
                </label>
              ))
              : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setAnswer(q.question, e.target.value)}
                  placeholder="Your answer"
                  className="flex-1 min-w-[200px] px-3 py-2 bg-grey-50 border border-grey-200 rounded-lg font-body text-sm focus:outline-none focus:border-accent-rose-600"
                />
              )}
          </div>
        </div>
      );
    }

    if (type === "Textarea") {
      return (
        <div key={q._id} className="space-y-2">
          <label className="block font-body text-sm font-medium text-black-charcoal">{q.question}</label>
          <textarea
            value={value}
            onChange={(e) => setAnswer(q.question, e.target.value)}
            placeholder="Your answer"
            rows={4}
            className="w-full px-3 py-2 bg-grey-50 border border-grey-200 rounded-lg font-body text-sm focus:outline-none focus:border-accent-rose-600 resize-y"
          />
        </div>
      );
    }

    if (type === "Dropdown") {
      return (
        <div key={q._id} className="space-y-2">
          <label className="block font-body text-sm font-medium text-black-charcoal">{q.question}</label>
          <select
            value={value}
            onChange={(e) => setAnswer(q.question, e.target.value)}
            className="w-full px-3 py-2 bg-grey-50 border border-grey-200 rounded-lg font-body text-sm focus:outline-none focus:border-accent-rose-600"
          >
            <option value="">Select an option</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {!options.length && (
            <input
              type="text"
              value={value}
              onChange={(e) => setAnswer(q.question, e.target.value)}
              placeholder="Your answer"
              className="w-full mt-2 px-3 py-2 bg-grey-50 border border-grey-200 rounded-lg font-body text-sm focus:outline-none focus:border-accent-rose-600"
            />
          )}
        </div>
      );
    }

    return (
      <div key={q._id} className="space-y-2">
        <label className="block font-body text-sm font-medium text-black-charcoal">{q.question}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setAnswer(q.question, e.target.value)}
          placeholder="Your answer"
          className="w-full px-3 py-2 bg-grey-50 border border-grey-200 rounded-lg font-body text-sm focus:outline-none focus:border-accent-rose-600"
        />
      </div>
    );
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center p-4">
        <div className="bg-primary-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" strokeWidth={2} />
          <h1 className="font-display text-2xl font-light text-black-charcoal mb-2">Application Submitted</h1>
          <p className="font-body text-grey-600 mb-6">
            Thank you for applying. Your payment was successful and we will get back to you soon.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-accent-rose-600 hover:bg-accent-rose-700 text-primary-white font-body text-sm rounded-full transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent-rose-600 animate-spin" strokeWidth={2} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grey-50">
      {/* MOBILE APPLY BUTTON */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="lg:hidden mb-6">
          <button
            onClick={scrollToForm}
            className="w-full bg-accent-rose-600 text-white py-3 rounded-xl font-semibold shadow-md"
          >
            Apply Now 🚀
          </button>
        </div>
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">

            <div className="flex items-center gap-2 bg-grey-50 px-4 py-2 rounded-full">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Trusted by 12,000+ Students</span>
            </div>

            <div className="flex items-center gap-2 bg-grey-50 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">4.8★ Average Rating</span>
            </div>

            <div className="flex items-center gap-2 bg-grey-50 px-4 py-2 rounded-full">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">100+ Colleges & Institutes</span>
            </div>

            <div className="flex items-center gap-2 bg-grey-50 px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="text-sm font-medium">250+ Live Projects Completed</span>
            </div>

            <div className="flex items-center gap-2 bg-grey-50 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">100% Refund Success Rate</span>
            </div>

          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* RIGHT CONTENT (mobile first, desktop right) */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">

            {/* HERO */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h1 className="text-3xl sm:text-4xl font-light mb-3">
                <strong>RedHeart Learn & Earn Summer Internship Program 💼✨</strong>
              </h1>

              <p>
                <strong>
                  This Internship is directly from the company not from any Educational firm or any Edtech company.
                </strong>
              </p>

              <p className="mt-1">
                <strong className="animate-pulse text-red-600">
                  Mentors/Trainers are from IITs/IIMs.
                </strong>
              </p>

              <p className="mt-4">
                RedHeart is a trusted online gifting portal in India offering seamless and reliable online gift delivery services across the country. We specialize in delivering flowers, cakes, candles, plants, and other personalized gift items to make every occasion truly special.
              </p>
            </div>

            {/* ABOUT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
              <h2 className="text-xl font-semibold">About the Internship</h2>

              <p>
                Looking for an opportunity where you don’t just learn — but also start earning while gaining real experience?
                Welcome to the RedHeart Internship Program, designed for students and beginners who want to step into the real world of business, marketing, and the fast-growing gifting industry.
              </p>

              <p>👉 This is not a typical internship.</p>
              <p>👉 This is your first step toward income + industry exposure.</p>

              <p className="mt-3">💡 What You’ll Get:</p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Internship Tenure : Minimum 1 to 3 Months.</li>
                <li>Timing Flexibility : Part-Time/Full-Time.</li>
                <li>  ⁠Your company<b> Gmail ID and Employee ID Card.</b>
                </li>
                <li> <b>⁠Flat 30% off </b>through employee ID(as you will be a company employee)
                </li>
                <li><b>⁠Earn 10% Commission</b> on each order from the website on any products (flowers, cakes, plants and other gift items), if done through your Employee ID.</li>
                <li>Work on real projects with an active gifting brand</li>
                <li>Learn practical skills (marketing, sales, customer handling)</li>
                <li>Get a chance to earn money through performance-based tasks</li>
                <li>Internship Certificate from RedHeart</li>
                <li>Top performers get paid opportunities & long-term roles</li>
              </ul>

              <p className="mt-3">💸 Income Opportunity:</p>
              <p>
                Unlike unpaid internships, here you get a chance to earn while you learn.
                With the right effort, interns can generate ₹3,000–₹15,000+ during the program.
              </p>

              <p className="mt-3">🎯 Who Should Join?</p>
              <ul className="list-disc pl-5">
                <li>Students looking for side income</li>
                <li>Freshers with no prior experience</li>
                <li>Anyone interested in business, marketing, or startups</li>
              </ul>

              <p className="mt-3">⏳ Limited Seats Only</p>
              <p>
                We keep batches small to ensure proper guidance.
                👉 Join now at just{" "}
                <span className="line-through text-gray-500">₹999</span>{" "}
                <span className="text-green-600 font-semibold">₹699</span>{" "}
                (Refundable tuition fee after completion of Internship)
              </p>
            </div>

            {/* SPECIALIZATION */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">
                🚀 Choose Your Specialization (Select Any One)
              </h2>

              <p>
                At RedHeart Learn & Earn Internship, you will focus on one domain based on your interest and career goals.
                👉 This ensures deep learning + better earning opportunities + real experience
              </p>

              <div>
                <h3 className="font-semibold">💻 Digital Marketing</h3>
                <ul className="list-disc pl-5">
                  <li>SEO</li>
                  <li>Content Strategy</li>
                  <li>Social Media Marketing</li>
                  <li>ORM</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">📊 Analytics & Product Marketing</h3>
                <ul className="list-disc pl-5">
                  <li>Google Analytics</li>
                  <li>Search Console</li>
                  <li>SEMrush</li>
                  <li>Product Marketing</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">👥 HR & Operations</h3>
                <ul className="list-disc pl-5">
                  <li>Hiring</li>
                  <li>Onboarding</li>
                  <li>Payroll</li>
                  <li>E-commerce Ops</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">🧑‍💻 Tech</h3>
                <ul className="list-disc pl-5">
                  <li>React Frontend</li>
                  <li>Node Backend</li>
                  <li>APIs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">🧑‍💻 Supply Chain </h3>
                <ul className="list-disc pl-5">
                  <li>Operation wandering category</li>
                  <li>Vendor</li>

                </ul>
              </div>
            </div>

            {/* FEE */}
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">
                💡 Why is there a One-Time Registration & Onboarding Fee?
              </h2>

              <p>
                At Evatools Private Limited (RedHeart), this is not just a fee — it’s a refundable security deposit of tuition fee that ensures serious participation and a professional internship experience.
              </p>

              <p>
                <strong className="animate-pulse text-red-600">
                  👉 100% Refundable:
                </strong>
                <br />
                Once you successfully complete the internship and assigned tasks, the tuition fee is refunded.
              </p>

              <div>
                <h3 className="font-semibold">🎯 What This Covers</h3>

                <p className="mt-2">📄 Official Candidate Profiling</p>
                <p className="text-sm text-gray-600">
                  Your profile is formally registered in our system, making you a verified part of the Evatools / RedHeart ecosystem.
                </p>

                <p className="mt-3">⚖️ Legal & Professional Documentation</p>
                <p className="text-sm text-gray-600">
                  We provide:
                  <br />Internship Agreement
                  <br />NDA & Terms of Service
                  <br />👉 Ensuring your work is secure, valid, and recognized.
                </p>

                <p className="mt-3">🗂️ Permanent Record & Verification</p>
                <p className="text-sm text-gray-600">
                  Your internship data is securely maintained, allowing you to:
                  <br />Request Experience Certificates
                  <br />Get Letters of Recommendation (LORs) anytime in the future
                </p>

                <p className="mt-3">🛠️ Access to Tools & Resources</p>
                <p className="text-sm text-gray-600">
                  Get access to:
                  <br />Google Analytics
                  <br />Google Search Console
                  <br />SEMrush (learning exposure)
                  <br />Internal training modules & RedHeart systems
                </p>
              </div>

              <div>
                <h3 className="font-semibold">🤝 Your Commitment (Important)</h3>
                <p className="text-sm text-gray-600">
                  To maintain quality and fairness, we expect interns to:
                  <br />Complete assigned tasks on time
                  <br />Actively participate in training & projects
                  <br />Follow professional conduct throughout the program
                  <br />👉 This ensures a serious learning environment for everyone
                </p>
              </div>

              <div>
                <h3 className="font-semibold">💸 Why a Refundable Deposit?</h3>
                <p className="text-sm text-gray-600">
                  We introduced this model to:
                  <br />Filter serious candidates only
                  <br />Ensure active participation
                  <br />Provide a high-quality, distraction-free experience
                  <br />👉 And most importantly — you get your tuition fee back after completion
                </p>
              </div>

              <div>
                <h3 className="font-semibold">🚀 In Simple Words</h3>
                <p className="text-sm text-gray-600">
                  You’re not paying a fee.
                  <br />
                  You’re placing a refundable commitment towards your growth, experience, and earning opportunity.
                </p>
              </div>

              <div className="space-y-2">
                <p>✅ 100% Refundable Tution fee.</p>
                <p>Get your Tuition fee full amount back after successful completion of the internship.</p>
                <p>✅ Verified Company Backing</p>
                <p>Powered by Evatools Private Limited (RedHeart) — a growing gifting brand with real operations.</p>
                <p>✅ Real Work, Not Just Training</p>
                <p>Work on live projects — no theory-only sessions.</p>
                <p>✅ Secure Payment Gateway</p>
                <p>Your payment is processed through trusted & encrypted payment systems.</p>
              </div>
            </div>

            {/* FAQ */}
            {/* FAQ */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">
                ❓ Frequently Asked Questions (FAQs)
              </h2>

              <div className="space-y-3">

                {[
                  ["Is this fee refundable?", "👉 Yes. Tuition fee is 100% refundable.\n Once you successfully complete the internship and assigned tasks, the full tuition fee amount will be refunded."],

                  ["Why do you charge a registration fee?", "This is not a typical fee — it’s a commitment-based security deposit to ensure:\nSerious participation\nActive involvement\nQuality learning environment\n👉 And you get it back tuition fee after completion."],

                  ["Can I really earn during the internship?", "Yes, you will get performance-based earning opportunities.\nYour income depends on your effort, task completion, and consistency.\n👉 Many interns can generate ₹3,000–₹15,000+, but it is not guaranteed."],

                  ["Do I need prior experience?", "❌ No experience required.\n     This internship is designed for:\nStudents\nFreshers\nBeginners\n👉 We guide you step-by-step from basics."],

                  ["Can I choose my domain?", "✅ Yes. You can select one specialization at the time of joining:\nDigital Marketing\nAnalytics & Product Marketing\nHR & Operations\nTech (Frontend / Backend)\n👉 You will work only in your chosen domain."],

                  ["What kind of work will I do?", "You will work on real projects and tasks, such as:\nMarketing campaigns\nContent creation\nData tracking & analysis\nHiring & operations tasks\nWebsite-related work (for tech roles)\n👉 No theory-only learning."],

                  ["Will I get a certificate?", "✅ Yes. You will receive an Internship Completion Certificate from Evatools Private Limited (RedHeart) after successfully completing the program."],

                  ["How long is the internship?", "The duration may vary by batch, but typically it runs for a few weeks with structured tasks and guidance."],

                  ["What happens if I don’t complete the internship?", "The refund is applicable only if:\nYou complete assigned tasks\nFollow the internship guidelines\n👉 Incomplete participation may lead to non-refundable status."],

                  ["How will I receive tasks and guidance?", "Direct Call (Phone call/Google Meet)\nThrough WhatsApp / Telegram groups\nLive sessions (if applicable)\nDirect communication with mentors\n👉 You’ll be guided throughout the program."],

                  ["Is this internship online or offline?", "✅ This is a fully online internship, so you can join from anywhere in India.\n     If you want to come offline, You are welcome to our official address."],

                  ["Will I get job or freelance opportunities after this?", "Top performers may get:\nPaid freelance projects\nLong-term work opportunities\nPriority consideration for roles\n👉 Based on performance (not guaranteed)."],

                  ["Is this legit or a scam?", "We understand your concern 🙂\nYou’ll work on real brand projects (RedHeart)\nProper documentation & agreements are provided\nRefund policy is clearly defined\n👉 Transparency + real work = trust"],

                  ["How do I join?", "Simple steps:\nFill the Form.\nSelect your domain\nComplete payment \nGet onboarding details"],

                  ["What if I have more questions?", "👉 You can:\nCall on the Given Number.\nDM us on Instagram\nContact us on WhatsApp\nOur team will assist you quickly 👍"]
                ].map(([q, a], i) => (
                  <details key={i} className="border rounded-lg p-4">
                    <summary className="font-medium">{q}</summary>
                    <p className="mt-2 text-sm text-gray-600 whitespace-pre-line">{a}</p>
                  </details>
                ))}

              </div>
            </div>
          </div>

          {/* LEFT FORM (mobile bottom, desktop left) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div ref={formRef} className="bg-white p-6 rounded-2xl shadow-md sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Apply Now</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {questions.map(renderQuestion)}

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full bg-accent-rose-600 hover:bg-accent-rose-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                >
                  {submitLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Pay{" "}
                  <span className="text-green-600 font-semibold">₹699</span>{" "}
                  & Apply
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HiringForInternship;
