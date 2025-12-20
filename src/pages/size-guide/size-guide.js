import React from "react";
import { Ruler } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-accent-rose-50/30 via-grey-50 to-primary-white border-b border-grey-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-rose-100 border border-accent-rose-200 mb-6">
            <Ruler className="w-8 h-8 text-accent-rose-600" strokeWidth={2} />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-black-charcoal mb-6 tracking-tight">
            Size Guide
          </h1>
          <p className="font-body text-lg md:text-xl text-grey-700 font-light leading-relaxed max-w-2xl mx-auto">
            Find the perfect size for your floral arrangements
          </p>
        </div>
      </section>

      {/* Size Guide Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-primary-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-4 tracking-tight">
                Choosing the Right Size
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-6 tracking-tight">
                Bouquet Size Chart
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              {/* Bouquet Size Table */}
              <div className="overflow-x-auto mb-12">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-grey-50 border-b-2 border-grey-200">
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Size
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Diameter
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Height
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Stems
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Best For
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Small
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        6-8 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        8-10 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        5-7 stems
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        Desk decoration, small spaces
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Medium
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        10-12 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        12-14 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        12-15 stems
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        Table centerpiece, gifts
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Large
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        14-16 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        16-18 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        20-25 stems
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        Special occasions, events
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Extra Large
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        18-20 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        20-24 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        30-40 stems
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        Grand gestures, weddings
                      </td>
                    </tr>
                    <tr className="hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Premium
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        22+ inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        24+ inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        50+ stems
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        Luxury arrangements, grand events
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-light text-black-charcoal mb-6 tracking-tight mt-12">
                Flower Stem Size Guide
              </h2>
              <p className="font-body text-base text-grey-700 font-light leading-relaxed mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              {/* Flower Stem Size Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-grey-50 border-b-2 border-grey-200">
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Flower Type
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Stem Length
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Bloom Size
                      </th>
                      <th className="px-4 py-4 text-left font-display text-sm font-light text-black-charcoal tracking-tight uppercase">
                        Vase Height
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Roses
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        16-24 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        3-5 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        8-12 inches
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Tulips
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        14-20 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        2-4 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        6-10 inches
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Lilies
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        18-30 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        4-6 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        10-14 inches
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Sunflowers
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        20-30 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        4-8 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        12-16 inches
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Peonies
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        16-22 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        4-6 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        8-12 inches
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Orchids
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        12-18 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        2-4 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        6-10 inches
                      </td>
                    </tr>
                    <tr className="border-b border-grey-100 hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Carnations
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        14-20 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        2-3 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        6-10 inches
                      </td>
                    </tr>
                    <tr className="hover:bg-grey-50 transition-colors duration-200">
                      <td className="px-4 py-4 font-display text-base font-light text-black-charcoal">
                        Hydrangeas
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        12-18 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        4-8 inches
                      </td>
                      <td className="px-4 py-4 font-body text-sm text-grey-700 font-light">
                        8-12 inches
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SizeGuide;

