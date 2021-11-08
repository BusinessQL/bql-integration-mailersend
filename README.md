# MailerSend - BusinessQL

## Example Payload

Send a POST request to the API with the following payload:

```json
{
  "from": {
    "email": "email@yourcompany.com",
    "name": "YourCompany, Inc."
  },
  "recipients": [
    {
      "name": "John Smith",
      "email": "john@yourcompany.com",
      "variables": {
        "name": "John Smith"
      }
    }
  ],
  "subject": "Test Email",
  "template": {
    "id": "MAILERSEND_TEMPLATE_ID"
  },
  "variables": {
    "title": "Test Email"
  },
  "apiKey": "MAILERSEND_API_KEY"
}
```
