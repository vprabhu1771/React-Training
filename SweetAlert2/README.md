```
https://sweetalert2.github.io/
```

# SweetAlert2 with React + Vite

A comprehensive guide for integrating SweetAlert2 popups in React applications bundled with Vite.

## 📦 Installation

```bash
npm install sweetalert2 sweetalert2-react-content
```

## 🚀 Implementation Examples

### Basic JavaScript Popups

For standard text alerts without JSX:

```jsx
import Swal from 'sweetalert2';

function App() {
  const showAlert = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Your action was completed.',
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  };

  return <button onClick={showAlert}>Trigger Alert</button>;
}

export default App;
```

### Advanced React/JSX Popups (Recommended)

To use JSX components, custom styles, or reactive states:

```jsx
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Initialize the React-supported wrapper
const MySwal = withReactContent(Swal);

function App() {
  const showCustomAlert = () => {
    MySwal.fire({
      title: <strong>Good job!</strong>,
      html: <p>You can use <i>any</i> React element here!</p>,
      icon: 'info',
      confirmButtonColor: '#3085d6'
    });
  };

  return <button onClick={showCustomAlert}>Trigger JSX Alert</button>;
}

export default App;
```

## 🎯 Common Alert Variations

### Confirmation Dialogues

Capture user choices (like deletions) via promises:

```jsx
const handleDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    }
  });
};
```

### Toast Notifications

Create minimalist, corner-anchored notification popups:

```jsx
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

// Usage
Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
});
```

## 🎨 Custom Theme Example

Create a custom-themed alert:

```jsx
const customAlert = () => {
  MySwal.fire({
    title: 'Custom Theme',
    html: (
      <div className="custom-alert">
        <p style={{ color: '#666', fontSize: '1.1em' }}>
          This alert uses your app's theme!
        </p>
      </div>
    ),
    background: '#f8f9fa',
    backdrop: 'rgba(0,0,0,0.4)',
    confirmButtonColor: '#6c5ce7',
    customClass: {
      popup: 'rounded-2xl shadow-xl',
      confirmButton: 'px-6 py-2 bg-purple-600 hover:bg-purple-700 transition'
    }
  });
};
```

## 🔧 Global Helper Utility

Create a reusable alert utility:

```jsx
// utils/alert.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showAlert = {
  success: (message) => {
    MySwal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  },
  
  error: (message) => {
    MySwal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#d33'
    });
  },
  
  confirm: (message, onConfirm) => {
    MySwal.fire({
      title: 'Confirm',
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  }
};

// Usage in component
import { showAlert } from '@/utils/alert';

showAlert.success('Operation completed!');
showAlert.error('Something went wrong.');
showAlert.confirm('Are you sure you want to proceed?', () => {
  // Handle confirmation
});
```

## 🌐 Async Network Requests Inside Popup

Handle async operations within alerts:

```jsx
const handleAsyncAction = async () => {
  try {
    const result = await Swal.fire({
      title: 'Processing...',
      html: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await Swal.fire({
      icon: 'success',
      title: 'Completed!',
      text: 'The operation was successful.',
      timer: 2000
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    });
  }
};
```

## 📝 TypeScript Support

For TypeScript projects, you can add type definitions:

```typescript
import Swal, { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface AlertOptions {
  title: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
}

const showAlert = ({ title, text, icon }: AlertOptions): Promise<SweetAlertResult> => {
  return MySwal.fire({
    title,
    text,
    icon,
    confirmButtonColor: '#3085d6'
  });
};
```

## 🎯 Best Practices

1. **Use `withReactContent`** when you need JSX support
2. **Create reusable utilities** for common alert patterns
3. **Handle async operations** properly with try/catch
4. **Consider accessibility** by using appropriate ARIA attributes
5. **Test alerts** in different screen sizes and browsers

## 📚 Additional Resources

- [SweetAlert2 Documentation](https://sweetalert2.github.io/)
- [React Integration Guide](https://sweetalert2.github.io/recipe-gallery/react.html)
- [GitHub Repository](https://github.com/sweetalert2/sweetalert2)

---

**Need help?** Feel free to open an issue or contribute to this guide!
