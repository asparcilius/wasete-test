# Skip Hire Web Application

A modern, responsive web application for booking skip hire services. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Postcode validation and lookup
- Waste type selection
- Skip size selection with pricing
- Responsive design for mobile and desktop
- Modern UI with smooth transitions
- Progress tracking

## Prerequisites

- Node.js 18.0 or later
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd remwaste
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
remwaste/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── PostcodeInput.tsx
│   │   │   ├── WasteTypeSelector.tsx
│   │   │   └── SkipSelector.tsx
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── ...
├── public/
│   └── images/
├── package.json
└── README.md
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [React](https://reactjs.org/) - UI library

## Development

The application follows a component-based architecture with three main steps:

1. Postcode Input - Validates and collects user postcode
2. Waste Type Selection - Allows users to choose waste type
3. Skip Selection - Displays available skip sizes and prices

## API Integration

The application integrates with the We Want Waste API for skip availability and pricing:
```
https://app.wewantwaste.co.uk/api/skips/by-location?postcode={postcode}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
