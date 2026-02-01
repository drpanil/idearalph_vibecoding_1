<script lang="ts">
  const testimonials = [
    {
      quote: "My dog had a skin issue at 11 PM. PetCare.ai diagnosed it within minutes and connected me to a vet who prescribed the right treatment. Saved me a midnight panic!",
      name: "Priya K.",
      location: "Bangalore",
      pet: "Max, Labrador",
      avatar: "🧑‍💼"
    },
    {
      quote: "Living in a tier-2 city, finding a good vet was always a challenge. Now I can consult specialists from metro cities without traveling. Game changer!",
      name: "Ramesh S.",
      location: "Coimbatore",
      pet: "Bruno & Tommy, Indies",
      avatar: "👨‍💼"
    },
    {
      quote: "The AI told me my cat's symptoms were serious and needed immediate attention. The vet confirmed it was a UTI. Early detection saved my cat's life.",
      name: "Ananya R.",
      location: "Mumbai",
      pet: "Whiskers, Persian",
      avatar: "👩‍💼"
    }
  ];
</script>

<section class="py-16 md:py-24 bg-background">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 md:mb-16">
      <h2 class="font-display text-h2 text-text-primary mb-4">
        Pet Parents Love Us
      </h2>
      <p class="text-body-lg text-text-secondary max-w-2xl mx-auto">
        Join thousands of happy pet parents who trust PetCare.ai for their furry friends.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      {#each testimonials as testimonial}
        <div class="bg-surface rounded-card p-8 shadow-card relative">
          <!-- Quote Mark -->
          <div class="absolute top-6 left-6 text-6xl text-primary/10 font-serif leading-none">
            "
          </div>

          <!-- Stars -->
          <div class="flex gap-1 mb-4 relative z-10">
            {#each Array(5) as _}
              <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            {/each}
          </div>

          <!-- Quote -->
          <p class="text-body text-text-secondary mb-6 relative z-10">
            "{testimonial.quote}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-2xl">
              {testimonial.avatar}
            </div>
            <div>
              <p class="font-semibold text-text-primary">{testimonial.name}</p>
              <p class="text-small text-text-secondary">{testimonial.location} • {testimonial.pet}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
