<script lang="ts">
  const whatsappNumber = '+919876543210'; // Replace with actual number
  const whatsappMessage = encodeURIComponent("Hi! I need help with my pet's health.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
</script>

<section class="relative bg-background py-16 md:py-24 lg:py-32 overflow-hidden">
  <!-- Subtle paw pattern background -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cpath d=&quot;M30 20c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5zm-10 8c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5-3.5-1.5-3.5-3.5 1.5-3.5 3.5-3.5zm20 0c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5-3.5-1.5-3.5-3.5 1.5-3.5 3.5-3.5zm-15 10c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5-3.5-1.5-3.5-3.5 1.5-3.5 3.5-3.5zm10 0c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5-3.5-1.5-3.5-3.5 1.5-3.5 3.5-3.5z&quot; fill=&quot;%236C5CE7&quot; fill-opacity=&quot;0.4&quot;/%3E%3C/svg%3E'); background-size: 60px 60px;"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Left Column - Content -->
      <div class="text-center lg:text-left">
        <h1 class="font-display text-hero text-text-primary mb-6">
          Your pet's health,<br />
          <span class="text-primary">one message away</span>
        </h1>

        <p class="text-body-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0">
          AI-powered vet triage via WhatsApp. Get answers in seconds, connect to verified vets in 2 minutes. No app download needed.
        </p>

        <!-- CTA Button -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <a href="#how-it-works" class="btn-secondary">
            See How It Works
          </a>
        </div>

        <!-- Trust Signals -->
        <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <div class="flex items-center gap-1">
            {#each Array(5) as _}
              <svg class="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            {/each}
          </div>
          <p class="text-small text-text-secondary">
            Trusted by <span class="font-semibold text-text-primary">10,000+</span> pet parents across India
          </p>
        </div>
      </div>

      <!-- Right Column - Illustration Placeholder -->
      <div class="relative hidden lg:block">
        <div class="relative w-full aspect-square max-w-lg mx-auto animate-float">
          <!-- Placeholder for illustration -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-light to-secondary/10 rounded-3xl flex items-center justify-center">
            <div class="text-center">
              <span class="text-8xl mb-4 block">🐕</span>
              <div class="bg-surface rounded-2xl shadow-card p-4 mx-8">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-whatsapp rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div class="text-left">
                    <p class="text-small font-medium text-text-primary">AI Health Check</p>
                    <p class="text-xs text-text-secondary">Send a photo to start</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
