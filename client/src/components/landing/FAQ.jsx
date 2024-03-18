/* eslint-disable react/no-unescaped-entities */
function FAQ() {
  const faqData = [
    {
      question: "How can I track my placement status?",
      answer:
        'To track your placement status, log in to your student account and navigate to the "Placement Status" section. There, you can view the details of your past and current placements.',
    },
    {
      question: "How can I update my placement information?",
      answer:
        "If you need to update your placement information, please contact the admin or placement coordinator at your college. They will assist you in making the necessary updates.",
    },
    {
      question: "How can I access my placement history?",
      answer:
        'To access your placement history, log in to your student account and visit the "Placement History" section. You will find a detailed record of your past placements.',
    },
    {
      question: "How can I contact the support team?",
      answer:
        'If you have any questions or issues related to your placements, you can contact our support team by sending an email to support@example.com or using the "Contact Us" form on our website.',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl bg-gray-50 px-4 py-10 md:px-0">
      <div>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            Find answers to common questions about tracking your placements.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {faqData.map((item, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-black">
                {item.question}
              </h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-gray-600">
          Can't find the answer you're looking for?{" "}
          <a
            href="#"
            title=""
            className="text-blue-600 font-semibold hover:underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </section>
  );
}

export default FAQ;