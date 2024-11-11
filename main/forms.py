from django import forms


class DateForm(forms.Form):
    start_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date', 'class': 'date', 'id': 'start_date'}))
    end_date = forms.DateField(widget=forms.DateInput(attrs={'type': 'date', 'class': 'date', 'id': 'end_date'}))


class TypeForm(forms.Form):
    freezeout = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'filters_checkbox',  # Добавляем CSS класс
            'type': 'checkbox',
            'value': 'Freezeout',
            'onchange': 'updateButtonText()'
        })
    )

    knockout = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'filters_checkbox',  # Добавляем CSS класс
            'type': 'checkbox',
            'value': 'Knockout',
            'onchange': 'updateButtonText()'
        })
    )

    mystery = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'filters_checkbox',  # Добавляем CSS класс
            'type': 'checkbox',
            'value': 'Mystery',
            'onchange': 'updateButtonText()'
        })
    )


class BuyInForm(forms.Form):
    b33 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$33',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b44 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$44',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b55 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$55',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b82 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$82',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b109 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$109',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b162 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$162',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b215 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$215',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b320 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$320',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b530 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$530',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b1050 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$1050',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b2100 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$2100',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b5200 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$5200',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b10300 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$10300',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )

    b25000 = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'buy_in_checkbox',
            'type': 'checkbox',
            'value': '$25000',
            'onchange': 'updateButtonTextBuyIn()'
        })
    )


class TableSizeForm(forms.Form):
    five_max = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'table_size_checkbox',
            'type': 'checkbox',
            'value': '5-max',
            'onchange': 'updateButtonTextTableSize()'
        })
    )

    six_max = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'table_size_checkbox',
            'type': 'checkbox',
            'value': '6-max',
            'onchange': 'updateButtonTextTableSize()'
        })
    )

    seven_max = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'table_size_checkbox',
            'type': 'checkbox',
            'value': '7-max',
            'onchange': 'updateButtonTextTableSize()'
        })
    )

    eight_max = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'table_size_checkbox',
            'type': 'checkbox',
            'value': '8-max',
            'onchange': 'updateButtonTextTableSize()'
        })
    )

    nine_max = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'table_size_checkbox',
            'type': 'checkbox',
            'value': '9-max',
            'onchange': 'updateButtonTextTableSize()'
        })
    )


class SpeedForm(forms.Form):
    slow = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'speed_checkbox',
            'type': 'checkbox',
            'value': 'Slow',
            'onchange': 'updateButtonTextSpeed()'
        })
    )

    regular = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'speed_checkbox',
            'type': 'checkbox',
            'value': 'Regular',
            'onchange': 'updateButtonTextSpeed()'
        })
    )

    turbo = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'speed_checkbox',
            'type': 'checkbox',
            'value': 'Turbo',
            'onchange': 'updateButtonTextSpeed()'
        })
    )

    hyper_turbo = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'speed_checkbox',
            'type': 'checkbox',
            'value': 'Hyper-Turbo',
            'onchange': 'updateButtonTextSpeed()'
        })
    )