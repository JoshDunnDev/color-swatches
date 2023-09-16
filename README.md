# color-swatches

> A simple color swatches project.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

## Design Decisions

For this project, I opted to enhance the user experience by incorporating both slider and text input elements. This choice was made to facilitate a smoother interaction for users. To ensure data integrity, I implemented basic input validation, restricting the input range to values between 0 and 100.

Furthermore, I introduced a "Get Swatches" button, enabling users to customize their desired saturation and lightness options before initiating the swatch retrieval process. To optimize the user experience, I batched the swatch requests, grouping them in sets of 20. This approach provides users with partial results rather than making them wait for the entire set to load. Additionally, I integrated a progress bar to convey the loading status, ensuring users are aware of ongoing swatch retrievals.

The application is designed to be responsive and adapts to a more mobile-friendly layout when the screen width is approximately 825px. In this layout, the progress bar aligns vertically alongside the sliders, and the swatches are centered for improved usability on mobile devices.
