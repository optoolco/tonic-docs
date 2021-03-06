# Relative-Time

The `Relative-Time` component creates a relative text representation of a
date value. This is almost entirely based on Github's [Time Elements][0].

## Demo

<div class="example">
  <tonic-relative-time
    date="${new Date()}"
    refresh="1e4"
    locale="en"
  </tonic-relative-time>
</div>

## Code

#### HTML

```html
<tonic-relative-time
  date="${new Date()}"
  refresh="1e4"
  locale="en"
</tonic-relative-time>
```

## Api

### Properties

| Property | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `locale` | *string* | Represents a Unicode locale identifier. | `default` |
| `date` | *string*, *Date* | A valid javascript date object or a parsable javascript date string. | `new Date()` |

[0]:https://github.com/github/time-elements
