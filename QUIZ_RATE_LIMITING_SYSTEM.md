# Quiz Rate Limiting System Documentation

## Overview
The quiz rate limiting system prevents users from abusing the quiz functionality by limiting them to 10 quiz attempts per hour. This system applies to all quiz types (huruf and kosakata) and provides clear feedback to users when they exceed the limit.

## How It Works

### 1. Rate Limiting Logic
- **Limit**: 10 quiz attempts per hour per user
- **Storage**: Uses Laravel Cache with key `quiz_rate_limit_{user_id}`
- **Time Window**: Rolling 1-hour window (not fixed hour)
- **Cleanup**: Automatically removes attempts older than 1 hour

### 2. Implementation Details

#### Middleware: `QuizRateLimit.php`
```php
// Key features:
- Tracks attempts in cache with user-specific keys
- Removes old attempts automatically
- Returns proper HTTP 429 status for rate-limited requests
- Provides clear error messages with time remaining
```

#### Cache Structure
```php
// Cache key: "quiz_rate_limit_{user_id}"
// Value: Array of timestamps for each quiz attempt
$attempts = [
    '2024-01-15 10:30:00',
    '2024-01-15 10:45:00',
    // ... up to 10 attempts
];
```

### 3. Frontend Integration

#### Error Handling
- **JSON Requests**: Returns 429 status with error message
- **Form Requests**: Redirects back with flash message
- **User Feedback**: Shows clear alert with time remaining

#### User Experience
1. User tries to start a quiz
2. System checks current attempts in last hour
3. If < 10 attempts: Quiz starts normally
4. If >= 10 attempts: Shows error message with countdown

### 4. Quiz Types Covered

#### Huruf Quiz
- Route: `POST /dashboard/start-quis`
- Middleware: `quiz.rate.limit`
- Affects: All huruf quiz levels (beginner, intermediate, advanced)

#### Kosakata Quiz
- Route: `POST /dashboard/kuis-kosakata/start`
- Middleware: `quiz.rate.limit`
- Affects: All kosakata quiz levels (beginner, intermediate, advanced)

### 5. Error Messages

#### When Rate Limited
```
"Anda telah mencapai batas maksimal 10 kuis per jam. 
Silakan coba lagi dalam {X} menit."
```

#### Response Format (JSON)
```json
{
  "error": "Rate limit exceeded",
  "message": "Anda telah mencapai batas maksimal 10 kuis per jam...",
  "minutes_until_reset": 45,
  "rate_limited": true
}
```

### 6. Technical Implementation

#### Cache Management
- **TTL**: 1 hour (3600 seconds)
- **Cleanup**: Automatic removal of old timestamps
- **Performance**: O(1) lookup time for attempt counting

#### Database Impact
- **No Database Storage**: Uses cache only
- **Memory Efficient**: Only stores timestamps
- **Scalable**: Per-user isolation

### 7. Monitoring and Debugging

#### Cache Keys
```php
// Format: quiz_rate_limit_{user_id}
// Example: quiz_rate_limit_01HXYZ123456789
```

#### Debugging Commands
```bash
# Check user's current attempts
php artisan tinker
Cache::get('quiz_rate_limit_{user_id}');

# Clear user's rate limit
Cache::forget('quiz_rate_limit_{user_id}');
```

### 8. Edge Cases Handled

#### Session Expiry
- Cache automatically expires after 1 hour
- No manual cleanup required
- Graceful degradation if cache fails

#### User Logout/Login
- Rate limit persists across sessions
- User-specific isolation maintained
- No cross-user contamination

#### Server Restart
- Cache cleared on restart
- Users can start fresh
- No permanent blocking

### 9. Future Enhancements

#### Planned Features
1. **Admin Override**: Allow admins to bypass limits
2. **Dynamic Limits**: Different limits per user level
3. **Analytics**: Track rate limiting usage
4. **Notifications**: Warn users approaching limit

#### Configuration Options
```php
// Future config options
'quiz_rate_limit' => [
    'max_attempts' => 10,
    'time_window' => 3600, // seconds
    'bypass_admin' => true,
    'warn_at' => 8, // warn at 8 attempts
];
```

### 10. Security Considerations

#### Prevention of Abuse
- **User Isolation**: Each user has separate limits
- **Time-based**: Rolling window prevents gaming
- **Server-side**: Cannot be bypassed by client

#### Performance Impact
- **Minimal**: Only cache operations
- **Scalable**: No database queries
- **Efficient**: O(1) time complexity

## Usage Examples

### Starting a Quiz (Normal Flow)
```javascript
// Frontend code
fetch('/dashboard/start-quis', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ letters: ['A', 'B'], level: 'beginner' })
})
.then(response => {
  if (response.status === 429) {
    // Handle rate limiting
    return response.json().then(data => {
      alert(data.message);
    });
  }
  // Normal quiz start
  return response.json();
});
```

### Rate Limited Response
```javascript
// When user is rate limited
{
  "error": "Rate limit exceeded",
  "message": "Anda telah mencapai batas maksimal 10 kuis per jam. Silakan coba lagi dalam 45 menit.",
  "minutes_until_reset": 45,
  "rate_limited": true
}
```

## Conclusion

The quiz rate limiting system provides a robust, user-friendly way to prevent quiz abuse while maintaining a good user experience. The system is:

- **Fair**: Equal limits for all users
- **Transparent**: Clear feedback on limits
- **Efficient**: Minimal performance impact
- **Scalable**: Works with any number of users
- **Secure**: Cannot be bypassed by users

This implementation ensures the quiz system remains sustainable and provides value to all users while preventing abuse. 