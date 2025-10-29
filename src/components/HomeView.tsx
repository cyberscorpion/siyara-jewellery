import { Product, Category } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { motion } from 'framer-motion';
import { Sparkle, Lightbulb, Storefront, Users, Diamond, Leaf, Infinity, Heart } from '@phosphor-icons/react';

interface HomeViewProps {
  products: Product[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  onProductClick: (product: Product) => void;
  wishlistedIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export function HomeView({
  products,
  selectedCategory,
  onCategoryChange,
  onProductClick,
  wishlistedIds,
  onToggleWishlist
}: HomeViewProps) {
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="min-h-[480px] flex flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWDBuNt-G3adnDGKrwvS8nYlwbkrcOmGeeEq89_B6OObjTKAeZFjz6aJtry1kf1g8fyKu2mN_H5YiPr-VSBUv7Nfy6bNCsArKYTmNKF9-BkqWJHhSXW5tltFhxRN33NE8PNTRJiC81KYjlP-Fid7rS_dAcfpmseT07Qcv5fDaj1utxWG6QKdR_8BofOXWERd-FeApgSoyV3tpzR_i2SnRCx-ZMIKIBgTj_GErghxzUhLYMBnsHsyxvAr-OwIKzlci29xvE6Nk48pA")`
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 text-center"
          >
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Elegance Redefined
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal md:text-base">
              Discover exquisite artificial jewellery crafted with elegance and precision
            </h2>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:h-12 md:px-5 bg-amber-600 text-white text-sm font-bold leading-normal tracking-[0.015em] md:text-base hover:opacity-90 transition-opacity"
            onClick={() => {
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="truncate">Shop Now</span>
          </motion.button>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="space-y-8">
        <h2 className="text-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Our Collections
        </h2>
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-2xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                No Products Found
              </h2>
              <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-body)' }}>
                Try selecting a different category
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 lg:gap-6 p-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  isWishlisted={wishlistedIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* About Us Section: Our Story */}
      <section id="about-us" className="py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="flex-1">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-amber-600 md:text-4xl">Our Story</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Siyara began with a simple vision: to create beautiful, high-quality artificial jewelry that feels as special as the person wearing it. Founded with passion for design and dedication to craftsmanship, our journey has evolved from a humble idea to a cherished brand. We believe that everyone deserves to shine, and our collections are designed to empower and inspire with every piece.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            {/* Timeline */}
            <div className="grid grid-cols-[32px_1fr] gap-x-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-1 pt-2"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600/20">
                  <Lightbulb size={14} className="text-amber-600" />
                </div>
                <div className="w-px grow bg-border"></div>
              </motion.div>
              <div className="flex flex-1 flex-col pb-6">
                <p className="font-bold">The Spark of an Idea</p>
                <p className="text-sm text-muted-foreground">2020</p>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-px h-2 bg-border"></div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600/20">
                  <Storefront size={14} className="text-amber-600" />
                </div>
                <div className="w-px grow bg-border"></div>
              </motion.div>
              <div className="flex flex-1 flex-col pb-6">
                <p className="font-bold">First Collection Launch</p>
                <p className="text-sm text-muted-foreground">2022</p>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-px h-2 bg-border"></div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600/20">
                  <Users size={14} className="text-amber-600" />
                </div>
              </motion.div>
              <div className="flex flex-1 flex-col">
                <p className="font-bold">A Growing Community</p>
                <p className="text-sm text-muted-foreground">2024</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-24 bg-amber-600/5 rounded-xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10 px-6 md:px-10"
        >
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-amber-600 md:text-4xl">
              Our Mission & Values
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-3xl mx-auto">
              We are dedicated to creating exquisite jewelry that empowers and inspires. Our principles guide every piece we craft.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-1 flex-col gap-4 rounded-lg border border-border bg-background p-6 text-center items-center hover:shadow-lg transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600/20 text-amber-600">
                <Diamond size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">Exquisite Craftsmanship</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Each piece is handcrafted with meticulous attention to detail by skilled artisans.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-1 flex-col gap-4 rounded-lg border border-border bg-background p-6 text-center items-center hover:shadow-lg transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600/20 text-amber-600">
                <Leaf size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">Quality Materials</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  We are committed to using ethically sourced and high-quality materials.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-1 flex-col gap-4 rounded-lg border border-border bg-background p-6 text-center items-center hover:shadow-lg transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-600/20 text-amber-600">
                <Infinity size={24} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">Timeless Design</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Our designs transcend trends, offering enduring style for every occasion.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Founder's Note Section */}
      <section className="py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-10 md:gap-16 bg-amber-600/5 rounded-xl p-8 md:p-12"
        >
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-48 w-48 rounded-full object-cover shrink-0 border-4 border-white shadow-lg" 
            src="/src/assets/icons/owner.jpg" 
            alt="Founder portrait"
          />
          <div className="text-center md:text-left">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl text-amber-600">A Note From Our Founder</h2>
            <p className="mt-4 text-base italic leading-relaxed text-muted-foreground">
              "Jewelry is more than an accessory; it's a form of self-expression, a whisper of a story. My dream was to craft pieces that not only adorn but also empower. Thank you for being a part of our journey and letting our creations become a part of yours."
            </p>
            <p className="mt-6 font-serif text-xl font-bold">Nishi Daga</p>
            <p className="text-sm text-muted-foreground">Founder & Creative Director</p>
          </div>
        </motion.div>
      </section>

      {/* Craftsmanship Gallery Section */}
      <section className="py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-amber-600 md:text-4xl">The Art of Craft</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            From the initial sketch to the final polish, every Siyara jewel is a testament to our commitment to quality. We blend traditional techniques with modern innovation to create pieces that are both beautiful and enduring.
          </p>
        </motion.div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCdcFWNDNF_3HKSed9z28X8vpGdapRcaLovePCI5GpEK3w5VCaWQmoQ6c5vjUDBT18gFIUodxdRr3tQbMI68P20KgisvcnJgCH4kSfCBMb0RdyqMnaSIZu_ZpKu1n87kFtb14XHvn601Pg6vVePy22y0usi558kLnWogpxzEwFOteeSkbvKhA6wvdw0F9DBcfGZcgplGC3LyeoleaVNJ2kmTTde8bHZGPJRqw5gd2KY8Vd6QqsUO5crb5OAyn9ukWuswIwuxHltXvw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCFKfiYOZaRAb3kQATY54yWmbol9E9lmGwpv4Ww4kTJLlkVxv_SG62axaULblSfouJD77b8a4u_ZFRcB4t7vFSdl726vIjAG4XomRW0D6wFY8P07hQvIZdn3Y0F0hXyTGrRFDKMUti54qliWu9C5iu6KdVENYWznwttRDy-g2mhu8JyNyrYtHpd9JDVU7s-m_LrihXxFjgbQ6Jq05E1Oz1LsOncF_YZ4wDzHNnEtgbjZNdhEVjbbzVq2Nm23EvkraNhcHSWgxSKMgs",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDm7wPTwCwRpeNn6YYORhAYvkYo8jezeohGiqecJnrATVGKQmOKtW24eEsq_f56p3PznKLzwpTUnuPIduC-aoy2ZZhhjajVczjB2LCEe2-3othGyOOu5SSUnbN8htm2LWFgpX4EieNyAmPeXBeZ9iEellDiFQO9-JQxD_eew67fJNqtfjhqkHzfFgo_scJZCZ3vgZHYcwHQ9Zf8mtsalSeNLXIWjG6Y5D_BoZ67HVNrobzlybfEiUWgmc_aAR8yFgZqzEC9RkRJcpQ",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAObwR8H4kWdbKzhhVOE4QEbyPh1cT8UsEesV5jg-BR6SLqxej--D9RJX16oQjpre-8KRiQX1QgT5h5NhV0BIM9k6QAzqtPlNOxialwnUxEz7Hoyq6E0HN4uigatLgztEMSx4XPEYK5o8C0gAfeqnX8aD3hThomns5ca4FUonPU2yfd5-WQ480Lx9V_41Ds4VT9Y4155RtSEy_AHq7yqSbcfcTgUJ0u0TEO0NgpTbv5KaYWhVybqT2Qn7peU-vRnhEQDltmlK0IzIk"
          ].map((src, index) => (
            <motion.img 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 cursor-pointer" 
              src={src}
              alt={`Craftsmanship image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-amber-600">Discover Your Radiance</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Inspired by our story? Explore our collections and find the piece that tells yours.
          </p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-amber-600 text-white font-bold leading-normal tracking-wide mx-auto hover:opacity-90 transition-opacity"
            onClick={() => {
              document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Heart className="mr-2" size={20} />
            <span className="truncate">Explore Our Collections</span>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
