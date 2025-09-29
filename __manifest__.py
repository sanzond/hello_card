{
    'name': 'Hello Card Demo',
    'version': '18.0.1.0.0',
    'category': 'Tools',
    'summary': 'HelloCard Component Demo',
    'description': """
        A simple demo module showing how to create and use
        a custom HelloCard component in Odoo 18.
        
        Features:
        - Custom HelloCard OWL component
        - Interactive demo interface
        - Responsive design with Bootstrap 5
        - Keyboard accessibility support
        - Multiple card configurations
    """,
    'author': 'Your Name',
    'website': 'https://www.yourwebsite.com',
    'depends': ['web'],
    'data': [
        'views/hello_demo_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'hello_card/static/src/js/hello_card/hello_card.js',
            'hello_card/static/src/js/hello_card/hello_card.xml',
            'hello_card/static/src/js/hello_demo/hello_demo.js',
            'hello_card/static/src/js/hello_demo/hello_demo.xml',
            'hello_card/static/src/js/hello_demo_action.js',
            'hello_card/static/src/scss/hello_card.scss',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}