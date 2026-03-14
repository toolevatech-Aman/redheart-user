import React, { useState, useEffect } from "react";
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-grey-600 hover:text-accent-rose-600 mb-6 font-body text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          Back
        </button>

        {/* Hero */}
        <header className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-rose-100 to-accent-pink-100 mb-5">
            <Briefcase className="w-8 h-8 text-accent-rose-600" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-black-charcoal tracking-tight mb-3">
            Internship Application Form
          </h1>
          <p className="font-body text-base text-grey-600 font-medium">
            Evatools Private Limited <span className="text-accent-rose-600">(RedHeart)</span>
          </p>
        </header>

        {/* About RedHeart */}
        <section className="bg-primary-white rounded-2xl border border-grey-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <p className="font-body text-grey-700 leading-relaxed">
              <strong className="text-black-charcoal">RedHeart</strong> is a trusted online gifting portal in India offering seamless and reliable online gift delivery services across the country. We specialize in delivering flowers, cakes, candles, plants, and other personalized gift items to make every occasion truly special.
            </p>
          </div>
        </section>

        {/* Internship details */}
        <section className="bg-primary-white rounded-2xl border border-grey-200 shadow-sm overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-lg sm:text-xl font-medium text-black-charcoal mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
              About the Internship
            </h2>
            <p className="font-body text-grey-700 leading-relaxed mb-4">
              We require interns in all our segments. This Internship will give you a <strong>certificate with a minimum tenure of 2 Months</strong>. Your work involves <strong>PART-TIME</strong> engagement, but you will receive a <strong>FULL-TIME Regular Internship Certificate</strong>. This is an <strong>unpaid Internship program</strong>. Upon successful completion of the internship, and subject to suitability and availability of positions, you may be offered a paid part-time or full-time role at the same level.
            </p>
            <div className="mt-5 pt-5 border-t border-grey-100">
              <h3 className="font-body text-sm font-semibold text-black-charcoal mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent-rose-600" strokeWidth={2} />
                What you will learn
              </h3>
              <ul className="space-y-2 font-body text-sm text-grey-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent-rose-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span><strong>Digital Marketing:</strong> Search Engine Optimization (SEO), Content strategy, Social Media Marketing, ORM</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent-rose-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span><strong>Analytics & Product Marketing:</strong> Google Analytics, SEMrush, Google Search Console</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-accent-rose-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <span><strong>HR:</strong> Hiring, documentation, negotiation, payroll sheets management, and more tools involved in E-commerce</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-br from-accent-rose-50/50 to-accent-pink-50/50 rounded-2xl border border-accent-rose-200/60 p-6 sm:p-8 mb-6">
          <h2 className="font-display text-lg font-medium text-black-charcoal mb-4">Contact us</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:career@redheart.in"
              className="flex items-center gap-3 px-4 py-3 bg-primary-white rounded-xl border border-grey-200 hover:border-accent-rose-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-accent-rose-100 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
              </div>
              <div className="text-left">
                <span className="font-body text-xs text-grey-500 block">Email</span>
                <span className="font-body text-sm font-medium text-black-charcoal">career@redheart.in</span>
              </div>
            </a>
            <a
              href="https://wa.me/919275506722"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-primary-white rounded-xl border border-grey-200 hover:border-accent-rose-300 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-accent-rose-100 flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
              </div>
              <div className="text-left">
                <span className="font-body text-xs text-grey-500 block">Phone / WhatsApp</span>
                <span className="font-body text-sm font-medium text-black-charcoal">+91 9275506722</span>
              </div>
            </a>
          </div>
        </section>

        {/* Why fee */}
        <section className="bg-primary-white rounded-2xl border border-grey-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <h2 className="font-display text-lg sm:text-xl font-medium text-black-charcoal mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
              Why is there a one-time Registration & Onboarding Fee?
            </h2>
            <p className="font-body text-grey-700 leading-relaxed mb-6">
              At Evatools Private Limited, we believe in treating our interns as future corporate leaders. This small, one-time investment of <strong className="text-accent-rose-700">₹999</strong> is dedicated entirely to your professional journey and ensures you receive a premium corporate experience from Day 1:
            </p>
            <ul className="space-y-4">
              {[
                {
                  icon: FileCheck,
                  title: "Official Candidature Profiling",
                  text: "Your professional profile will be formally integrated into our corporate HR database, making you a verified part of the Evatools/RedHeart ecosystem.",
                },
                {
                  icon: Shield,
                  title: "Legal & Professional Documentation",
                  text: "We handle all your legal paperwork, including duly signed internship contracts, non-disclosure agreements, and terms of service, ensuring your work experience is fully protected and legally valid.",
                },
                {
                  icon: FileCheck,
                  title: "Permanent Digital & Physical Records",
                  text: "We maintain your dedicated corporate file within the company. This ensures that whenever you need a Letter of Recommendation (LOR) or Experience Certificate in the future from Evatools Private Limited, your records are instantly accessible and verified.",
                },
                {
                  icon: Award,
                  title: "Exclusive Intern Benefits",
                  text: "This fee unlocks your access to company resources, internal training modules, tools access for Search Console, Google Analytics, SEMrush, and the official RedHeart gifting ecosystem tools.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-grey-50/80 border border-grey-100">
                  <div className="w-10 h-10 rounded-full bg-accent-rose-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-accent-rose-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-black-charcoal mb-1">{item.title}</h3>
                    <p className="font-body text-sm text-grey-700 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Application form */}
        <section className="bg-primary-white border border-grey-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-grey-200 bg-gradient-to-br from-grey-50/50 to-primary-white">
            <h2 className="font-display text-xl font-medium text-black-charcoal flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-accent-rose-600" strokeWidth={2} />
              Application Form
            </h2>
            <p className="font-body text-sm text-grey-600 mt-1">
              Answer the questions below and pay ₹999 to submit your application.
            </p>
          </div>
          <div className="p-6 sm:p-8">
            {questions.length === 0 ? (
              <p className="font-body text-grey-600 text-center py-8">No questions available at the moment.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map(renderQuestion)}
                <div className="pt-6 border-t border-grey-200">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-3.5 bg-accent-rose-600 hover:bg-accent-rose-700 disabled:opacity-70 text-primary-white font-body text-sm font-medium rounded-xl transition-colors flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg"
                  >
                    {submitLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2} />
                        Processing...
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          Pay and Submit
                          <span className="line-through opacity-70">₹999</span>
                          <span className="text-base font-semibold">₹499</span>
                        </div>
                        <span className="text-[10px] opacity-80">Limited Time Offer</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        <p className="font-body text-xs text-grey-500 text-center mt-8">
          By submitting, you agree to the internship terms and the one-time registration fee.
        </p>
      </div>
    </div>
  );
};

export default HiringForInternship;
