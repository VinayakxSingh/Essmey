import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 mb-16">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
          <p className="text-xl font-light">
            Unveiling the passion behind Essmey's handcrafted perfumes
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="container-custom max-w-4xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-serif font-medium mb-6">The Beginning</h2>
            <p className="mb-4">
              At Essmey, we believe that every individual has a unique essence waiting to be unveiled. Born out of a college student's passion for fragrances, Essmey stands as a testament to dedication, creativity, and the art of perfumery.
            </p>
            <p>
              What started as a hobby in a small dorm room has blossomed into a brand that celebrates individuality through scent. Our founder's journey of experimentation and discovery laid the foundation for what Essmey is today - a brand that cherishes the artisanal approach to perfume-making.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1595425858558-271d91d82a8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Essmey Beginning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1605093438297-920908d2e72c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Essmey Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-serif font-medium mb-6">Our Craftsmanship</h2>
            <p className="mb-4">
              Each bottle of Essmey perfume is a labor of love, meticulously crafted by hand to ensure quality and uniqueness. We believe in the power of slow beauty - taking the time to perfect each formulation, test, and adjust until the scent tells exactly the story we want it to tell.
            </p>
            <p>
              Our small-batch production allows us to maintain stringent quality control, ensuring that every product that bears the Essmey name is nothing short of exceptional. From ingredient selection to the final packaging, every step is handled with care and attention to detail.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-medium mb-6">Our Philosophy</h2>
            <p className="mb-4">
              At Essmey, we believe that fragrance is more than just a pleasant scent - it's a form of self-expression, a statement of identity, and a powerful trigger for memories and emotions. Our philosophy is centered around creating scents that help individuals express their true essence.
            </p>
            <p className="mb-4">
              We are committed to ethical sourcing and sustainable practices. Wherever possible, we use ingredients that are responsibly harvested and packaging materials that minimize environmental impact. We believe that luxury and consciousness can coexist.
            </p>
            <p>
              Our vision is to create a world where everyone can find a fragrance that resonates with their personal story, a scent that feels like an extension of themselves rather than just something they wear.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1606314953429-62e04de5dec5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Essmey Philosophy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-16 mb-16">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-medium mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 text-center">
              <div className="text-4xl font-serif mb-4">Craftsmanship</div>
              <p>
                We believe in the value of handcrafted products, made with attention to detail and a commitment to excellence. Each bottle is a work of art, created with passion and precision.
              </p>
            </div>

            <div className="bg-white p-8 text-center">
              <div className="text-4xl font-serif mb-4">Authenticity</div>
              <p>
                We stay true to our artisanal roots, creating genuine fragrances that tell a story. We value honesty in our relationships with customers and transparency in our processes.
              </p>
            </div>

            <div className="bg-white p-8 text-center">
              <div className="text-4xl font-serif mb-4">Individuality</div>
              <p>
                We celebrate the unique essence of each person. Our fragrances are designed to complement individual personalities, not mask them or make everyone smell the same.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="container-custom text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-medium mb-6">Join Our Journey</h2>
        <p className="mb-8">
          We invite you to be part of the Essmey story. Explore our collection of handcrafted perfumes and find the scent that speaks to your essence. Follow us on social media to stay updated on new releases, behind-the-scenes glimpses, and more.
        </p>
        <Link to="/shop" className="btn-primary mx-2">
          Shop Collection
        </Link>
        <Link to="/contact" className="btn-secondary mx-2">
          Contact Us
        </Link>
      </section>
    </div>
  )
}

export default About
